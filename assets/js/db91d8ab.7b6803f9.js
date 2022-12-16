"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4135],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>h});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),d=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},m=function(e){var t=d(e.components);return a.createElement(o.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),u=d(n),h=r,k=u["".concat(o,".").concat(h)]||u[h]||s[h]||l;return n?a.createElement(k,p(p({ref:t},m),{},{components:n})):a.createElement(k,p({ref:t},m))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,p=new Array(l);p[0]=u;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:r,p[1]=i;for(var d=2;d<l;d++)p[d]=n[d];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},97500:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>u,frontMatter:()=>p,metadata:()=>o,toc:()=>m});n(67294);var a=n(3905);function r(){return r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r.apply(this,arguments)}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}const p={sidebar_label:"ElementHandle"},i="ElementHandle class",o={unversionedId:"api/puppeteer.elementhandle",id:"version-19.4.1/api/puppeteer.elementhandle",title:"ElementHandle class",description:"ElementHandle represents an in-page DOM element.",source:"@site/versioned_docs/version-19.4.1/api/puppeteer.elementhandle.md",sourceDirName:"api",slug:"/api/puppeteer.elementhandle",permalink:"/api/puppeteer.elementhandle",draft:!1,tags:[],version:"19.4.1",frontMatter:{sidebar_label:"ElementHandle"},sidebar:"api",previous:{title:"JSHandle.toString",permalink:"/api/puppeteer.jshandle.tostring"},next:{title:"ElementHandle.$",permalink:"/api/puppeteer.elementhandle._"}},d={},m=[{value:"Signature:",id:"signature",level:4},{value:"Remarks",id:"remarks",level:2},{value:"Properties",id:"properties",level:2},{value:"Methods",id:"methods",level:2}],s={toc:m};function u(e){var{components:t}=e,n=l(e,["components"]);return(0,a.kt)("wrapper",r({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",r({},{id:"elementhandle-class"}),"ElementHandle class"),(0,a.kt)("p",null,"ElementHandle represents an in-page DOM element."),(0,a.kt)("h4",r({},{id:"signature"}),"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",r({parentName:"pre"},{className:"language-typescript"}),"export declare class ElementHandle<ElementType extends Node = Element> extends JSHandle<ElementType>\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Extends:")," ",(0,a.kt)("a",r({parentName:"p"},{href:"/api/puppeteer.jshandle"}),"JSHandle"),"<","ElementType",">"),(0,a.kt)("h2",r({},{id:"remarks"}),"Remarks"),(0,a.kt)("p",null,"ElementHandles can be created with the ",(0,a.kt)("a",r({parentName:"p"},{href:"/api/puppeteer.page._"}),"Page.$()")," method."),(0,a.kt)("pre",null,(0,a.kt)("code",r({parentName:"pre"},{className:"language-ts"}),"import puppeteer from 'puppeteer';\n\n(async () => {\n  const browser = await puppeteer.launch();\n  const page = await browser.newPage();\n  await page.goto('https://example.com');\n  const hrefElement = await page.$('a');\n  await hrefElement.click();\n  // ...\n})();\n")),(0,a.kt)("p",null,"ElementHandle prevents the DOM element from being garbage-collected unless the handle is ",(0,a.kt)("a",r({parentName:"p"},{href:"/api/puppeteer.jshandle.dispose"}),"disposed"),". ElementHandles are auto-disposed when their origin frame gets navigated."),(0,a.kt)("p",null,"ElementHandle instances can be used as arguments in ",(0,a.kt)("a",r({parentName:"p"},{href:"/api/puppeteer.page._eval"}),"Page.$eval()")," and ",(0,a.kt)("a",r({parentName:"p"},{href:"/api/puppeteer.page.evaluate"}),"Page.evaluate()")," methods."),(0,a.kt)("p",null,"If you're using TypeScript, ElementHandle takes a generic argument that denotes the type of element the handle is holding within. For example, if you have a handle to a ",(0,a.kt)("inlineCode",{parentName:"p"},"<select>")," element, you can type it as ",(0,a.kt)("inlineCode",{parentName:"p"},"ElementHandle<HTMLSelectElement>")," and you get some nicer type checks."),(0,a.kt)("p",null,"The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the ",(0,a.kt)("inlineCode",{parentName:"p"},"ElementHandle")," class."),(0,a.kt)("h2",r({},{id:"properties"}),"Properties"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",r({parentName:"tr"},{align:null}),"Property"),(0,a.kt)("th",r({parentName:"tr"},{align:null}),"Modifiers"),(0,a.kt)("th",r({parentName:"tr"},{align:null}),"Type"),(0,a.kt)("th",r({parentName:"tr"},{align:null}),"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.frame"}),"frame")),(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("code",null,"readonly")),(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.frame"}),"Frame")),(0,a.kt)("td",r({parentName:"tr"},{align:null}))))),(0,a.kt)("h2",r({},{id:"methods"}),"Methods"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",r({parentName:"tr"},{align:null}),"Method"),(0,a.kt)("th",r({parentName:"tr"},{align:null}),"Modifiers"),(0,a.kt)("th",r({parentName:"tr"},{align:null}),"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle._"}),"$(selector)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"Queries the current element for an element matching the given selector.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.__"}),"$$(selector)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"Queries the current element for all elements matching the given selector.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.__eval"}),"$$eval(selector, pageFunction, args)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("p",null,"Runs the given function on an array of elements matching the given selector in the current element."),(0,a.kt)("p",null,"If the given function returns a promise, then this method will wait till the promise resolves."))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle._eval"}),"$eval(selector, pageFunction, args)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("p",null,"Runs the given function on the first element matching the given selector in the current element."),(0,a.kt)("p",null,"If the given function returns a promise, then this method will wait till the promise resolves."))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle._x"}),"$x(expression)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.aselement"}),"asElement()")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.boundingbox"}),"boundingBox()")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"This method returns the bounding box of the element (relative to the main frame), or ",(0,a.kt)("code",null,"null")," if the element is not visible.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.boxmodel"}),"boxModel()")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"This method returns boxes of the element, or ",(0,a.kt)("code",null,"null")," if the element is not visible.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.click"}),"click(this, options)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"This method scrolls element into view if needed, and then uses ",(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.page.mouse"}),"Page.mouse")," to click in the center of the element. If the element is detached from DOM, the method throws an error.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.clickablepoint"}),"clickablePoint(offset)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"Returns the middle point within an element unless a specific offset is provided.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.contentframe"}),"contentFrame()")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"Resolves to the content frame for element handles referencing iframe nodes, or null otherwise")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.drag"}),"drag(this, target)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"This method creates and captures a dragevent from the element.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.draganddrop"}),"dragAndDrop(this, target, options)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"This method triggers a dragenter, dragover, and drop on the element.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.dragenter"}),"dragEnter(this, data)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"This method creates a ",(0,a.kt)("code",null,"dragenter")," event on the element.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.dragover"}),"dragOver(this, data)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"This method creates a ",(0,a.kt)("code",null,"dragover")," event on the element.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.drop"}),"drop(this, data)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"This method triggers a drop on the element.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.focus"}),"focus()")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"Calls ",(0,a.kt)("a",r({parentName:"td"},{href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus"}),"focus")," on the element.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.hover"}),"hover(this)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"This method scrolls element into view if needed, and then uses ",(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.page.mouse"}),"Page.mouse")," to hover over the center of the element. If the element is detached from DOM, the method throws an error.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.isintersectingviewport"}),"isIntersectingViewport(this, options)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"Resolves to true if the element is visible in the current viewport.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.press"}),"press(key, options)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"Focuses the element, and then uses ",(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.keyboard.down"}),"Keyboard.down()")," and ",(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.keyboard.up"}),"Keyboard.up()"),".")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.screenshot"}),"screenshot(this, options)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"This method scrolls element into view if needed, and then uses ",(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.page.screenshot"}),"Page.screenshot()")," to take a screenshot of the element. If the element is detached from DOM, the method throws an error.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.select"}),"select(values)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"Triggers a ",(0,a.kt)("code",null,"change")," and ",(0,a.kt)("code",null,"input")," event once all the provided options have been selected. If there's no ",(0,a.kt)("code",null,"<","select",">")," element matching ",(0,a.kt)("code",null,"selector"),", the method throws an error.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.tap"}),"tap(this)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"This method scrolls element into view if needed, and then uses ",(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.touchscreen.tap"}),"Touchscreen.tap()")," to tap in the center of the element. If the element is detached from DOM, the method throws an error.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.type"}),"type(text, options)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("p",null,"Focuses the element, and then sends a ",(0,a.kt)("code",null,"keydown"),", ",(0,a.kt)("code",null,"keypress"),"/",(0,a.kt)("code",null,"input"),", and ",(0,a.kt)("code",null,"keyup")," event for each character in the text."),(0,a.kt)("p",null,"To press a special key, like ",(0,a.kt)("code",null,"Control")," or ",(0,a.kt)("code",null,"ArrowDown"),", use ",(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.press"}),"ElementHandle.press()"),"."))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.uploadfile"}),"uploadFile(this, filePaths)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),"This method expects ",(0,a.kt)("code",null,"elementHandle")," to point to an ",(0,a.kt)("a",r({parentName:"td"},{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"}),"input element"),".")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.waitforselector"}),"waitForSelector(selector, options)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("p",null,"Wait for an element matching the given selector to appear in the current element."),(0,a.kt)("p",null,"Unlike ",(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.frame.waitforselector"}),"Frame.waitForSelector()"),", this method does not work across navigations or if the element is detached from DOM."))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",r({parentName:"tr"},{align:null}),(0,a.kt)("a",r({parentName:"td"},{href:"/api/puppeteer.elementhandle.waitforxpath"}),"waitForXPath(xpath, options)")),(0,a.kt)("td",r({parentName:"tr"},{align:null})),(0,a.kt)("td",r({parentName:"tr"},{align:null}))))))}u.isMDXComponent=!0}}]);