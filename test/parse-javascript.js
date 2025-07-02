/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var assert = require('assert');
var matter = require('../');

describe('parse javascript:', function() {
  it('should parse front matter when options.lang is javascript', function() {
    assert.throws(function() {
      matter.read('./test/fixtures/lang-javascript-object-fn.md', {
        lang: 'javascript'
      })
    });
  });

  it('should parse front matter when options.language is js', function() {
    assert.throws(function() {
      matter.read('./test/fixtures/lang-javascript-object-fn.md', {
        language: 'js'
      })
    });
  });

  it('should eval functions', function() {
    assert.throws(function() {
      matter.read('./test/fixtures/lang-javascript-fn.md', {language: 'js'});
    });
  });

  it('should detect "javascript" after the first delimiter', function() {
    assert.throws(function() {
      matter.read('./test/fixtures/autodetect-javascript.md');
    });
  });
});
