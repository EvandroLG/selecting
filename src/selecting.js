/*
  * SelectingText - A library that allows you to access the text selected by the user
  * http://github.com/evandrolg/SelectingText
  * author: Evandro Leopoldino Goncalves <evandrolgoncalves@gmail.com>
  * http://github.com/evandrolg
  * License: MIT
*/

(function(global, doc) {

  'use strict';

  var selection = doc.selection;
  var _getSelection = doc.getSelection;
  var hasSupport = _getSelection || selection;

  // thanks @Tomalak!
  var isNodeList = function(element) {
    var stringRepr = Object.prototype.toString.call(element);

    return typeof element === 'object' &&
           /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
           element.hasOwnProperty('length') &&
           (element.length === 0 || (typeof element[0] === 'object' &&
           element[0].nodeType > 0));
  };

  var debounce = function(callback, wait) {
    var timeout;

    return function() {
      var context = this, args = arguments;

      var later = function() {
        timeout = null;
        callback.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  var bind = function(element, callback, hasLib) {
    if (hasLib) {
      element.on('mouseup', debounce(callback, 150));
      return;
    }

    var bindDOM = function(el) {
      el.addEventListener('mouseup', debounce(callback, 150), false);
    };

    if (!isNodeList(element)) {
      bindDOM(element);
      return;
    }

    [].forEach.call(element, function(item) {
      bindDOM(item);
    });
  };

  var selectText = function(element, callback, hasLib) {
    var onMouseUp = function(e) {
      e.preventDefault();

      var text = _getSelection ? doc.getSelection() :
                 selection.createRange().text;

      callback(text);
    };

    bind(element, onMouseUp, hasLib);
  };

  global.selecting = function(element, callback) {
    if (!hasSupport) { return; }

    var hasLib = global.jQuery && element instanceof global.jQuery ||
                 global.Zepto && element instanceof global.Zepto;

    selectText(element, callback, hasLib);
  };

}(window, document));
