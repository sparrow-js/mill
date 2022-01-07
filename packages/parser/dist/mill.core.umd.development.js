(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.Mill = global.Mill || {}, global.Mill.Core = factory()));
}(this, (function () { 'use strict';

  function index () {
      console.log('***core***');
  }

  return index;

})));
