'use strict';

const stripBom = require('strip-bom-string');
const typeOf = require('kind-of');

exports.define = function(obj, key, val) {
  Reflect.defineProperty(obj, key, {
    enumerable: false,
    configurable: true,
    writable: true,
    value: val
  });
};

/**
 * Returns true if `val` is a buffer
 */

exports.isBuffer = function(val) {
  return val instanceof Uint8Array;
};

/**
 * Returns true if `val` is an object
 */

exports.isObject = function(val) {
  return typeOf(val) === 'object';
};

/**
 * Cast `input` to a buffer
 */

exports.toBuffer = function(input) {
  if(typeof input === 'string') {
    if(typeof TextEncoder !== "undefined") {
      return new TextEncoder().encode(input);
    }

    throw new Error("Unsupported environment: TextEncoder global required.");
  }
  return input;
};

/**
 * Cast `val` to a string.
 */

exports.toString = function(input) {
  if (exports.isBuffer(input)) {
    if(typeof TextDecoder !== "undefined") {
      return stripBom(new TextDecoder().decode(input));
    }
    throw new Error("Unsupported environment: TextDecoder required.");
  }
  if (typeof input !== 'string') {
    throw new TypeError('expected input to be a string or buffer');
  }
  return stripBom(input);
};

/**
 * Cast `val` to an array.
 */

exports.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Returns true if `str` starts with `substr`.
 */

exports.startsWith = function(str, substr, len) {
  if (typeof len !== 'number') len = substr.length;
  return str.slice(0, len) === substr;
};
