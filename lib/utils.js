'use strict';


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

const toString = Object.prototype.toString;

/**
 * Returns true if `val` is an object
 */

exports.isObject = function(val) {
  return toString.call(val) === '[object Object]';
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


function stripBom(str) {
  return (typeof str === 'string' && str.charAt(0) === '\ufeff') ?
    str.slice(1) :
    str;
}

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
