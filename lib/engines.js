'use strict';

const yaml = require('js-yaml');

/**
 * Default engines
 */

const engines = exports = module.exports;

/**
 * YAML
 */

engines.yaml = {
  parse: yaml.load.bind(yaml),
  stringify: yaml.dump.bind(yaml)
};

/**
 * JSON
 */

engines.json = {
  parse: JSON.parse.bind(JSON),
  stringify: function(obj, options) {
    const opts = Object.assign({replacer: null, space: 2}, options);
    return JSON.stringify(obj, opts.replacer, opts.space);
  }
};

/**
 * JavaScript
 */

engines.javascript = {
  parse: function parse(str, options, wrap) {
    throw new Error('Parsing JavaScript in front matter is no longer supported internally in `@11ty/gray-matter`. Support is added upstream in `@11ty/eleventy`.');
  },
  stringify: function() {
    throw new Error('stringifying JavaScript is not supported');
  }
};
