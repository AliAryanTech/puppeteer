/**
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Protocol} from 'devtools-protocol';
import {
  BoundingBox,
  BoxModel,
  ClickOptions,
  ElementHandle,
  Offset,
  Point,
  PressOptions,
} from '../api/ElementHandle.js';
import {JSHandle} from '../api/JSHandle.js';
import {Page, ScreenshotOptions} from '../api/Page.js';
import {assert} from '../util/assert.js';
import {CDPSession} from './Connection.js';
import {ExecutionContext} from './ExecutionContext.js';
import {Frame} from './Frame.js';
import {FrameManager} from './FrameManager.js';
import {WaitForSelectorOptions} from './IsolatedWorld.js';
import {CDPPage} from './Page.js';
import {getQueryHandlerAndSelector} from './QueryHandler.js';
import {
  ElementFor,
  EvaluateFuncWith,
  HandleFor,
  HandleOr,
  NodeFor,
} from './types.js';
import {KeyInput} from './USKeyboardLayout.js';
import {
  debugError,
  isString,
  releaseObject,
  valueFromRemoteObject,
} from './util.js';

const applyOffsetsToQuad = (
  quad: Point[],
  offsetX: number,
  offsetY: number
) => {
  return quad.map(part => {
    return {x: part.x + offsetX, y: part.y + offsetY};
  });
};

/**
 * The CDPElementHandle extends ElementHandle now to keep compatibility
 * with `instanceof` because of that we need to have methods for
 * CDPJSHandle to in this implementation as well.
 *
 * @internal
 */
export class CDPElementHandle<
  ElementType extends Node = Element
> extends ElementHandle<ElementType> {
  #disposed = false;
  #frame: Frame;
  #context: ExecutionContext;
  #remoteObject: Protocol.Runtime.RemoteObject;

  constructor(
    context: ExecutionContext,
    remoteObject: Protocol.Runtime.RemoteObject,
    frame: Frame
  ) {
    super();
    this.#context = context;
    this.#remoteObject = remoteObject;
    this.#frame = frame;
  }

  /**
   * @internal
   */
  override executionContext(): ExecutionContext {
    return this.#context;
  }

  /**
   * @internal
   */
  override get client(): CDPSession {
    return this.#context._client;
  }

  override remoteObject(): Protocol.Runtime.RemoteObject {
    return this.#remoteObject;
  }

  override async evaluate<
    Params extends unknown[],
    Func extends EvaluateFuncWith<ElementType, Params> = EvaluateFuncWith<
      ElementType,
      Params
    >
  >(
    pageFunction: Func | string,
    ...args: Params
  ): Promise<Awaited<ReturnType<Func>>> {
    return this.executionContext().evaluate(pageFunction, this, ...args);
  }

  override evaluateHandle<
    Params extends unknown[],
    Func extends EvaluateFuncWith<ElementType, Params> = EvaluateFuncWith<
      ElementType,
      Params
    >
  >(
    pageFunction: Func | string,
    ...args: Params
  ): Promise<HandleFor<Awaited<ReturnType<Func>>>> {
    return this.executionContext().evaluateHandle(pageFunction, this, ...args);
  }

  get #frameManager(): FrameManager {
    return this.#frame._frameManager;
  }

  get #page(): Page {
    return this.#frame.page();
  }

  override get frame(): Frame {
    return this.#frame;
  }

  override get disposed(): boolean {
    return this.#disposed;
  }

  override async getProperty<K extends keyof ElementType>(
    propertyName: HandleOr<K>
  ): Promise<HandleFor<ElementType[K]>>;
  override async getProperty(propertyName: string): Promise<JSHandle<unknown>>;
  override async getProperty<K extends keyof ElementType>(
    propertyName: HandleOr<K>
  ): Promise<HandleFor<ElementType[K]>> {
    return this.evaluateHandle((object, propertyName) => {
      return object[propertyName as K];
    }, propertyName);
  }

  override async jsonValue(): Promise<ElementType> {
    if (!this.#remoteObject.objectId) {
      return valueFromRemoteObject(this.#remoteObject);
    }
    const value = await this.evaluate(object => {
      return object;
    });
    if (value === undefined) {
      throw new Error('Could not serialize referenced object');
    }
    return value;
  }

  override toString(): string {
    if (!this.#remoteObject.objectId) {
      return 'JSHandle:' + valueFromRemoteObject(this.#remoteObject);
    }
    const type = this.#remoteObject.subtype || this.#remoteObject.type;
    return 'JSHandle@' + type;
  }

  override async $<Selector extends string>(
    selector: Selector
  ): Promise<CDPElementHandle<NodeFor<Selector>> | null> {
    const {updatedSelector, queryHandler} =
      getQueryHandlerAndSelector(selector);
    assert(
      queryHandler.queryOne,
      'Cannot handle queries for a single element with the given selector'
    );
    return (await queryHandler.queryOne(
      this,
      updatedSelector
    )) as CDPElementHandle<NodeFor<Selector>> | null;
  }

  override async $$<Selector extends string>(
    selector: Selector
  ): Promise<Array<CDPElementHandle<NodeFor<Selector>>>> {
    const {updatedSelector, queryHandler} =
      getQueryHandlerAndSelector(selector);
    assert(
      queryHandler.queryAll,
      'Cannot handle queries for a multiple element with the given selector'
    );
    return (await queryHandler.queryAll(this, updatedSelector)) as Array<
      CDPElementHandle<NodeFor<Selector>>
    >;
  }

  override async $eval<
    Selector extends string,
    Params extends unknown[],
    Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<
      NodeFor<Selector>,
      Params
    >
  >(
    selector: Selector,
    pageFunction: Func | string,
    ...args: Params
  ): Promise<Awaited<ReturnType<Func>>> {
    const elementHandle = await this.$(selector);
    if (!elementHandle) {
      throw new Error(
        `Error: failed to find element matching selector "${selector}"`
      );
    }
    const result = await elementHandle.evaluate(pageFunction, ...args);
    await elementHandle.dispose();
    return result;
  }

  override async $$eval<
    Selector extends string,
    Params extends unknown[],
    Func extends EvaluateFuncWith<
      Array<NodeFor<Selector>>,
      Params
    > = EvaluateFuncWith<Array<NodeFor<Selector>>, Params>
  >(
    selector: Selector,
    pageFunction: Func | string,
    ...args: Params
  ): Promise<Awaited<ReturnType<Func>>> {
    const {updatedSelector, queryHandler} =
      getQueryHandlerAndSelector(selector);
    assert(
      queryHandler.queryAll,
      'Cannot handle queries for a multiple element with the given selector'
    );
    const handles = (await queryHandler.queryAll(
      this,
      updatedSelector
    )) as Array<HandleFor<NodeFor<Selector>>>;
    const elements = (await this.evaluateHandle((_, ...elements) => {
      return elements;
    }, ...handles)) as JSHandle<Array<NodeFor<Selector>>>;
    const [result] = await Promise.all([
      elements.evaluate(pageFunction, ...args),
      ...handles.map(handle => {
        return handle.dispose();
      }),
    ]);
    await elements.dispose();
    return result;
  }

  override async $x(
    expression: string
  ): Promise<Array<CDPElementHandle<Node>>> {
    if (expression.startsWith('//')) {
      expression = `.${expression}`;
    }
    return this.$$(`xpath/${expression}`);
  }

  override async waitForSelector<Selector extends string>(
    selector: Selector,
    options: WaitForSelectorOptions = {}
  ): Promise<CDPElementHandle<NodeFor<Selector>> | null> {
    const {updatedSelector, queryHandler} =
      getQueryHandlerAndSelector(selector);
    assert(queryHandler.waitFor, 'Query handler does not support waiting');
    return (await queryHandler.waitFor(
      this,
      updatedSelector,
      options
    )) as CDPElementHandle<NodeFor<Selector>> | null;
  }

  override async waitForXPath(
    xpath: string,
    options: {
      visible?: boolean;
      hidden?: boolean;
      timeout?: number;
    } = {}
  ): Promise<CDPElementHandle<Node> | null> {
    if (xpath.startsWith('//')) {
      xpath = `.${xpath}`;
    }
    return this.waitForSelector(`xpath/${xpath}`, options);
  }

  override async toElement<
    K extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
  >(tagName: K): Promise<HandleFor<ElementFor<K>>> {
    const isMatchingTagName = await this.evaluate((node, tagName) => {
      return node.nodeName === tagName.toUpperCase();
    }, tagName);
    if (!isMatchingTagName) {
      throw new Error(`Element is not a(n) \`${tagName}\` element`);
    }
    return this as unknown as HandleFor<ElementFor<K>>;
  }

  override asElement(): CDPElementHandle<ElementType> | null {
    return this;
  }

  override async contentFrame(): Promise<Frame | null> {
    const nodeInfo = await this.client.send('DOM.describeNode', {
      objectId: this.remoteObject().objectId,
    });
    if (typeof nodeInfo.node.frameId !== 'string') {
      return null;
    }
    return this.#frameManager.frame(nodeInfo.node.frameId);
  }

  async #scrollIntoViewIfNeeded(
    this: CDPElementHandle<Element>
  ): Promise<void> {
    const error = await this.evaluate(
      async (element): Promise<string | undefined> => {
        if (!element.isConnected) {
          return 'Node is detached from document';
        }
        if (element.nodeType !== Node.ELEMENT_NODE) {
          return 'Node is not of type HTMLElement';
        }
        return;
      }
    );

    if (error) {
      throw new Error(error);
    }

    try {
      await this.client.send('DOM.scrollIntoViewIfNeeded', {
        objectId: this.remoteObject().objectId,
      });
    } catch (_err) {
      // Fallback to Element.scrollIntoView if DOM.scrollIntoViewIfNeeded is not supported
      await this.evaluate(
        async (element, pageJavascriptEnabled): Promise<void> => {
          const visibleRatio = async () => {
            return await new Promise(resolve => {
              const observer = new IntersectionObserver(entries => {
                resolve(entries[0]!.intersectionRatio);
                observer.disconnect();
              });
              observer.observe(element);
            });
          };
          if (!pageJavascriptEnabled || (await visibleRatio()) !== 1.0) {
            element.scrollIntoView({
              block: 'center',
              inline: 'center',
              // @ts-expect-error Chrome still supports behavior: instant but
              // it's not in the spec so TS shouts We don't want to make this
              // breaking change in Puppeteer yet so we'll ignore the line.
              behavior: 'instant',
            });
          }
        },
        this.#page.isJavaScriptEnabled()
      );
    }
  }

  async #getOOPIFOffsets(
    frame: Frame
  ): Promise<{offsetX: number; offsetY: number}> {
    let offsetX = 0;
    let offsetY = 0;
    let currentFrame: Frame | null = frame;
    while (currentFrame && currentFrame.parentFrame()) {
      const parent = currentFrame.parentFrame();
      if (!currentFrame.isOOPFrame() || !parent) {
        currentFrame = parent;
        continue;
      }
      const {backendNodeId} = await parent._client().send('DOM.getFrameOwner', {
        frameId: currentFrame._id,
      });
      const result = await parent._client().send('DOM.getBoxModel', {
        backendNodeId: backendNodeId,
      });
      if (!result) {
        break;
      }
      const contentBoxQuad = result.model.content;
      const topLeftCorner = this.#fromProtocolQuad(contentBoxQuad)[0];
      offsetX += topLeftCorner!.x;
      offsetY += topLeftCorner!.y;
      currentFrame = parent;
    }
    return {offsetX, offsetY};
  }

  override async clickablePoint(offset?: Offset): Promise<Point> {
    const [result, layoutMetrics] = await Promise.all([
      this.client
        .send('DOM.getContentQuads', {
          objectId: this.remoteObject().objectId,
        })
        .catch(debugError),
      (this.#page as CDPPage)._client().send('Page.getLayoutMetrics'),
    ]);
    if (!result || !result.quads.length) {
      throw new Error('Node is either not clickable or not an HTMLElement');
    }
    // Filter out quads that have too small area to click into.
    // Fallback to `layoutViewport` in case of using Firefox.
    const {clientWidth, clientHeight} =
      layoutMetrics.cssLayoutViewport || layoutMetrics.layoutViewport;
    const {offsetX, offsetY} = await this.#getOOPIFOffsets(this.#frame);
    const quads = result.quads
      .map(quad => {
        return this.#fromProtocolQuad(quad);
      })
      .map(quad => {
        return applyOffsetsToQuad(quad, offsetX, offsetY);
      })
      .map(quad => {
        return this.#intersectQuadWithViewport(quad, clientWidth, clientHeight);
      })
      .filter(quad => {
        return computeQuadArea(quad) > 1;
      });
    if (!quads.length) {
      throw new Error('Node is either not clickable or not an HTMLElement');
    }
    const quad = quads[0]!;
    if (offset) {
      // Return the point of the first quad identified by offset.
      let minX = Number.MAX_SAFE_INTEGER;
      let minY = Number.MAX_SAFE_INTEGER;
      for (const point of quad) {
        if (point.x < minX) {
          minX = point.x;
        }
        if (point.y < minY) {
          minY = point.y;
        }
      }
      if (
        minX !== Number.MAX_SAFE_INTEGER &&
        minY !== Number.MAX_SAFE_INTEGER
      ) {
        return {
          x: minX + offset.x,
          y: minY + offset.y,
        };
      }
    }
    // Return the middle point of the first quad.
    let x = 0;
    let y = 0;
    for (const point of quad) {
      x += point.x;
      y += point.y;
    }
    return {
      x: x / 4,
      y: y / 4,
    };
  }

  #getBoxModel(): Promise<void | Protocol.DOM.GetBoxModelResponse> {
    const params: Protocol.DOM.GetBoxModelRequest = {
      objectId: this.remoteObject().objectId,
    };
    return this.client.send('DOM.getBoxModel', params).catch(error => {
      return debugError(error);
    });
  }

  #fromProtocolQuad(quad: number[]): Point[] {
    return [
      {x: quad[0]!, y: quad[1]!},
      {x: quad[2]!, y: quad[3]!},
      {x: quad[4]!, y: quad[5]!},
      {x: quad[6]!, y: quad[7]!},
    ];
  }

  #intersectQuadWithViewport(
    quad: Point[],
    width: number,
    height: number
  ): Point[] {
    return quad.map(point => {
      return {
        x: Math.min(Math.max(point.x, 0), width),
        y: Math.min(Math.max(point.y, 0), height),
      };
    });
  }

  /**
   * This method scrolls element into view if needed, and then
   * uses {@link Page.mouse} to hover over the center of the element.
   * If the element is detached from DOM, the method throws an error.
   */
  override async hover(this: CDPElementHandle<Element>): Promise<void> {
    await this.#scrollIntoViewIfNeeded();
    const {x, y} = await this.clickablePoint();
    await this.#page.mouse.move(x, y);
  }

  /**
   * This method scrolls element into view if needed, and then
   * uses {@link Page.mouse} to click in the center of the element.
   * If the element is detached from DOM, the method throws an error.
   */
  override async click(
    this: CDPElementHandle<Element>,
    options: ClickOptions = {}
  ): Promise<void> {
    await this.#scrollIntoViewIfNeeded();
    const {x, y} = await this.clickablePoint(options.offset);
    await this.#page.mouse.click(x, y, options);
  }

  /**
   * This method creates and captures a dragevent from the element.
   */
  override async drag(
    this: CDPElementHandle<Element>,
    target: Point
  ): Promise<Protocol.Input.DragData> {
    assert(
      this.#page.isDragInterceptionEnabled(),
      'Drag Interception is not enabled!'
    );
    await this.#scrollIntoViewIfNeeded();
    const start = await this.clickablePoint();
    return await this.#page.mouse.drag(start, target);
  }

  override async dragEnter(
    this: CDPElementHandle<Element>,
    data: Protocol.Input.DragData = {items: [], dragOperationsMask: 1}
  ): Promise<void> {
    await this.#scrollIntoViewIfNeeded();
    const target = await this.clickablePoint();
    await this.#page.mouse.dragEnter(target, data);
  }

  override async dragOver(
    this: CDPElementHandle<Element>,
    data: Protocol.Input.DragData = {items: [], dragOperationsMask: 1}
  ): Promise<void> {
    await this.#scrollIntoViewIfNeeded();
    const target = await this.clickablePoint();
    await this.#page.mouse.dragOver(target, data);
  }

  override async drop(
    this: CDPElementHandle<Element>,
    data: Protocol.Input.DragData = {items: [], dragOperationsMask: 1}
  ): Promise<void> {
    await this.#scrollIntoViewIfNeeded();
    const destination = await this.clickablePoint();
    await this.#page.mouse.drop(destination, data);
  }

  override async dragAndDrop(
    this: CDPElementHandle<Element>,
    target: CDPElementHandle<Node>,
    options?: {delay: number}
  ): Promise<void> {
    await this.#scrollIntoViewIfNeeded();
    const startPoint = await this.clickablePoint();
    const targetPoint = await target.clickablePoint();
    await this.#page.mouse.dragAndDrop(startPoint, targetPoint, options);
  }

  override async select(...values: string[]): Promise<string[]> {
    for (const value of values) {
      assert(
        isString(value),
        'Values must be strings. Found value "' +
          value +
          '" of type "' +
          typeof value +
          '"'
      );
    }

    return this.evaluate((element, vals): string[] => {
      const values = new Set(vals);
      if (!(element instanceof HTMLSelectElement)) {
        throw new Error('Element is not a <select> element.');
      }

      const selectedValues = new Set<string>();
      if (!element.multiple) {
        for (const option of element.options) {
          option.selected = false;
        }
        for (const option of element.options) {
          if (values.has(option.value)) {
            option.selected = true;
            selectedValues.add(option.value);
            break;
          }
        }
      } else {
        for (const option of element.options) {
          option.selected = values.has(option.value);
          if (option.selected) {
            selectedValues.add(option.value);
          }
        }
      }
      element.dispatchEvent(new Event('input', {bubbles: true}));
      element.dispatchEvent(new Event('change', {bubbles: true}));
      return [...selectedValues.values()];
    }, values);
  }

  override async uploadFile(
    this: CDPElementHandle<HTMLInputElement>,
    ...filePaths: string[]
  ): Promise<void> {
    const isMultiple = await this.evaluate(element => {
      return element.multiple;
    });
    assert(
      filePaths.length <= 1 || isMultiple,
      'Multiple file uploads only work with <input type=file multiple>'
    );

    // Locate all files and confirm that they exist.
    let path: typeof import('path');
    try {
      path = await import('path');
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error(
          `JSHandle#uploadFile can only be used in Node-like environments.`
        );
      }
      throw error;
    }
    const files = filePaths.map(filePath => {
      if (path.win32.isAbsolute(filePath) || path.posix.isAbsolute(filePath)) {
        return filePath;
      } else {
        return path.resolve(filePath);
      }
    });
    const {objectId} = this.remoteObject();
    const {node} = await this.client.send('DOM.describeNode', {
      objectId,
    });
    const {backendNodeId} = node;

    /*  The zero-length array is a special case, it seems that
         DOM.setFileInputFiles does not actually update the files in that case,
         so the solution is to eval the element value to a new FileList directly.
     */
    if (files.length === 0) {
      await this.evaluate(element => {
        element.files = new DataTransfer().files;

        // Dispatch events for this case because it should behave akin to a user action.
        element.dispatchEvent(new Event('input', {bubbles: true}));
        element.dispatchEvent(new Event('change', {bubbles: true}));
      });
    } else {
      await this.client.send('DOM.setFileInputFiles', {
        objectId,
        files,
        backendNodeId,
      });
    }
  }

  override async tap(this: CDPElementHandle<Element>): Promise<void> {
    await this.#scrollIntoViewIfNeeded();
    const {x, y} = await this.clickablePoint();
    await this.#page.touchscreen.touchStart(x, y);
    await this.#page.touchscreen.touchEnd();
  }

  override async touchStart(this: CDPElementHandle<Element>): Promise<void> {
    await this.#scrollIntoViewIfNeeded();
    const {x, y} = await this.clickablePoint();
    await this.#page.touchscreen.touchStart(x, y);
  }

  override async touchMove(this: CDPElementHandle<Element>): Promise<void> {
    await this.#scrollIntoViewIfNeeded();
    const {x, y} = await this.clickablePoint();
    await this.#page.touchscreen.touchMove(x, y);
  }

  override async touchEnd(this: CDPElementHandle<Element>): Promise<void> {
    await this.#scrollIntoViewIfNeeded();
    await this.#page.touchscreen.touchEnd();
  }

  override async focus(): Promise<void> {
    await this.evaluate(element => {
      if (!(element instanceof HTMLElement)) {
        throw new Error('Cannot focus non-HTMLElement');
      }
      return element.focus();
    });
  }

  override async type(text: string, options?: {delay: number}): Promise<void> {
    await this.focus();
    await this.#page.keyboard.type(text, options);
  }

  override async press(key: KeyInput, options?: PressOptions): Promise<void> {
    await this.focus();
    await this.#page.keyboard.press(key, options);
  }

  override async boundingBox(): Promise<BoundingBox | null> {
    const result = await this.#getBoxModel();

    if (!result) {
      return null;
    }

    const {offsetX, offsetY} = await this.#getOOPIFOffsets(this.#frame);
    const quad = result.model.border;
    const x = Math.min(quad[0]!, quad[2]!, quad[4]!, quad[6]!);
    const y = Math.min(quad[1]!, quad[3]!, quad[5]!, quad[7]!);
    const width = Math.max(quad[0]!, quad[2]!, quad[4]!, quad[6]!) - x;
    const height = Math.max(quad[1]!, quad[3]!, quad[5]!, quad[7]!) - y;

    return {x: x + offsetX, y: y + offsetY, width, height};
  }

  override async boxModel(): Promise<BoxModel | null> {
    const result = await this.#getBoxModel();

    if (!result) {
      return null;
    }

    const {offsetX, offsetY} = await this.#getOOPIFOffsets(this.#frame);

    const {content, padding, border, margin, width, height} = result.model;
    return {
      content: applyOffsetsToQuad(
        this.#fromProtocolQuad(content),
        offsetX,
        offsetY
      ),
      padding: applyOffsetsToQuad(
        this.#fromProtocolQuad(padding),
        offsetX,
        offsetY
      ),
      border: applyOffsetsToQuad(
        this.#fromProtocolQuad(border),
        offsetX,
        offsetY
      ),
      margin: applyOffsetsToQuad(
        this.#fromProtocolQuad(margin),
        offsetX,
        offsetY
      ),
      width,
      height,
    };
  }

  override async screenshot(
    this: CDPElementHandle<Element>,
    options: ScreenshotOptions = {}
  ): Promise<string | Buffer> {
    let needsViewportReset = false;

    let boundingBox = await this.boundingBox();
    assert(boundingBox, 'Node is either not visible or not an HTMLElement');

    const viewport = this.#page.viewport();

    if (
      viewport &&
      (boundingBox.width > viewport.width ||
        boundingBox.height > viewport.height)
    ) {
      const newViewport = {
        width: Math.max(viewport.width, Math.ceil(boundingBox.width)),
        height: Math.max(viewport.height, Math.ceil(boundingBox.height)),
      };
      await this.#page.setViewport(Object.assign({}, viewport, newViewport));

      needsViewportReset = true;
    }

    await this.#scrollIntoViewIfNeeded();

    boundingBox = await this.boundingBox();
    assert(boundingBox, 'Node is either not visible or not an HTMLElement');
    assert(boundingBox.width !== 0, 'Node has 0 width.');
    assert(boundingBox.height !== 0, 'Node has 0 height.');

    const layoutMetrics = await this.client.send('Page.getLayoutMetrics');
    // Fallback to `layoutViewport` in case of using Firefox.
    const {pageX, pageY} =
      layoutMetrics.cssVisualViewport || layoutMetrics.layoutViewport;

    const clip = Object.assign({}, boundingBox);
    clip.x += pageX;
    clip.y += pageY;

    const imageData = await this.#page.screenshot(
      Object.assign(
        {},
        {
          clip,
        },
        options
      )
    );

    if (needsViewportReset && viewport) {
      await this.#page.setViewport(viewport);
    }

    return imageData;
  }

  override async isIntersectingViewport(
    this: CDPElementHandle<Element>,
    options?: {
      threshold?: number;
    }
  ): Promise<boolean> {
    const {threshold = 0} = options ?? {};
    return await this.evaluate(async (element, threshold) => {
      const visibleRatio = await new Promise<number>(resolve => {
        const observer = new IntersectionObserver(entries => {
          resolve(entries[0]!.intersectionRatio);
          observer.disconnect();
        });
        observer.observe(element);
      });
      return threshold === 1 ? visibleRatio === 1 : visibleRatio > threshold;
    }, threshold);
  }

  override async dispose(): Promise<void> {
    if (this.#disposed) {
      return;
    }
    this.#disposed = true;
    await releaseObject(this.client, this.#remoteObject);
  }
}

function computeQuadArea(quad: Point[]): number {
  /* Compute sum of all directed areas of adjacent triangles
     https://en.wikipedia.org/wiki/Polygon#Simple_polygons
   */
  let area = 0;
  for (let i = 0; i < quad.length; ++i) {
    const p1 = quad[i]!;
    const p2 = quad[(i + 1) % quad.length]!;
    area += (p1.x * p2.y - p2.x * p1.y) / 2;
  }
  return Math.abs(area);
}
