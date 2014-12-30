/*
  * SelectingText - A simple solution to work with manipulating text selection
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

  function debounce(callback, wait) {
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

  var isNodeList = function(element) {
    var stringRepr = Object.prototype.toString.call(nodes);

    return typeof nodes === 'object' &&
           /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
           nodes.hasOwnProperty('length') &&
           (nodes.length === 0 || (typeof nodes[0] === "object" && 
           nodes[0].nodeType > 0));
  };

  var bind = function(element, callback, hasLib) {
    hasLib ? element.on('mouseup', debounce(callback, 200)) :
             element.addEventListener('mouseup', debounce(callback, 200), false);
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

  global.SelectingText = function(element, callback) {
    if (!hasSupport) { return; }

    var hasLib = global.jQuery && element instanceof global.jQuery ||
                 global.Zepto && element instanceof global.Zepto;

    selectText(element, callback, hasLib);
  };
  
}(window, document));
