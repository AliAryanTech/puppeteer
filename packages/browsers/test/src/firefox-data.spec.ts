/**
 * Copyright 2023 Google Inc. All rights reserved.
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

import {
  executablePath,
  resolveDownloadUrl,
} from '../../lib/cjs/browsers/firefox.js';
import {BrowserPlatform} from '../../lib/cjs/browsers/browsers.js';
import assert from 'assert';
import path from 'path';

describe('Firefox', () => {
  it('should resolve download URLs', () => {
    assert.strictEqual(
      resolveDownloadUrl(BrowserPlatform.LINUX, '111.0a1'),
      'https://archive.mozilla.org/pub/firefox/nightly/latest-mozilla-central/firefox-111.0a1.en-US.linux-x86_64.tar.bz2'
    );
    assert.strictEqual(
      resolveDownloadUrl(BrowserPlatform.MAC, '111.0a1'),
      'https://archive.mozilla.org/pub/firefox/nightly/latest-mozilla-central/firefox-111.0a1.en-US.mac.dmg'
    );
    assert.strictEqual(
      resolveDownloadUrl(BrowserPlatform.MAC_ARM, '111.0a1'),
      'https://archive.mozilla.org/pub/firefox/nightly/latest-mozilla-central/firefox-111.0a1.en-US.mac.dmg'
    );
    assert.strictEqual(
      resolveDownloadUrl(BrowserPlatform.WIN32, '111.0a1'),
      'https://archive.mozilla.org/pub/firefox/nightly/latest-mozilla-central/firefox-111.0a1.en-US.win32.zip'
    );
    assert.strictEqual(
      resolveDownloadUrl(BrowserPlatform.WIN64, '111.0a1'),
      'https://archive.mozilla.org/pub/firefox/nightly/latest-mozilla-central/firefox-111.0a1.en-US.win64.zip'
    );
  });

  it('should resolve executable paths', () => {
    assert.strictEqual(
      executablePath(BrowserPlatform.LINUX, '111.0a1'),
      path.join('linux-111.0a1', 'firefox', 'firefox')
    );
    assert.strictEqual(
      executablePath(BrowserPlatform.MAC, '111.0a1'),
      path.join(
        'mac-111.0a1',
        'Firefox Nightly.app',
        'Contents',
        'MacOS',
        'firefox'
      )
    );
    assert.strictEqual(
      executablePath(BrowserPlatform.MAC_ARM, '111.0a1'),
      path.join(
        'mac_arm-111.0a1',
        'Firefox Nightly.app',
        'Contents',
        'MacOS',
        'firefox'
      )
    );
    assert.strictEqual(
      executablePath(BrowserPlatform.WIN32, '111.0a1'),
      path.join('win32-111.0a1', 'firefox', 'firefox.exe')
    );
    assert.strictEqual(
      executablePath(BrowserPlatform.WIN64, '111.0a1'),
      path.join('win64-111.0a1', 'firefox', 'firefox.exe')
    );
  });
});
