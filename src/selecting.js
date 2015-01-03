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

  // var bind = function(element, callback, hasLib) {
  //   if (hasLib) {
  //     if ('ontouchstart' in global) {
  //       element.each(function () {
  //         checkForSelections(this, callback);
  //       });

  //       return;
  //     } 

  //     element.on('mouseup', debounce(callback, 150));

  //     return;
  //   }

  //   var bindDOM = function(el) {
  //     if ('ontouchstart' in global) {
  //       checkForSelections(el, callback);
  //       return;
  //     } 

  //     el.addEventListener('mouseup', debounce(callback, 150), false);
  //   };

  //   if (!isNodeList(element)) {
  //     bindDOM(element);
  //     return;
  //   }

  //   [].forEach.call(element, function(item) {
  //     bindDOM(item);
  //   });
  // };

  // var selectText = function(element, callback, hasLib) {
  //   var onMouseUp = function() {
  //     var text = getText();
  //     callback(text);
  //   };

  //   bind(element, onMouseUp, hasLib);
  // };

  // // source http://stackoverflow.com/a/5379408
  // var getText = function() {
  //   var text = '';

  //   if (_getSelection) {
  //     text = global.getSelection().toString();
  //   } else if (doc.selection && doc.selection.type !== 'Control') {
  //     text = doc.selection.createRange().text;
  //   }

  //   return text;
  // };

  // /*
  //   This function detect text selection during a long-press in the screen
  // */
  // var checkForSelections = function (element, callback) {
  //   var intervalCheckingForText;

  //   var selectionStart = function () {
  //     element.removeEventListener('touchend', selectionEnd, false);
  //     element.addEventListener('touchend', selectionEnd, false);

  //     if (intervalCheckingForText) {
  //       clearInterval(intervalCheckingForText);
  //     }

  //     intervalCheckingForText = setInterval(function () {
  //       var text = getText();

  //       if (text !== '') {
  //         callback(text);
  //         selectionEnd();
  //         checkForChanges(callback);
  //       }
  //     }, 100);
  //   };

  //   var selectionEnd = function () {
  //     clearInterval(intervalCheckingForText);
  //     element.removeEventListener('touchend', selectionEnd, false);
  //   };

  //   element.addEventListener('touchstart', selectionStart, false);
  // };

  // var checkForChanges = function (callback) {
  //   var currentText = getText();

  //   var intervalCheckingForText = setInterval(function () {
  //     if (getText() !== currentText) {
  //       callback(getText());
  //       currentText = getText();

  //     } else if (getText() === '') {
  //       clearInterval(intervalCheckingForText);
  //     }
  //   }, 100);
  // };

  var Selecting = function(element, callback) {
    this.element = element;
    this.callback = callback || function() {};
    this.isTouch = 'ontouchstart' in global;
    this.hasLib = global.jQuery && element instanceof global.jQuery ||
                 global.Zepto && element instanceof global.Zepto;
  };

  Selecting.prototype = {
    events: function() {
      var callback = this.callback;

      this[ this.isTouch ? 'bindTouch' : 'bindMouseUp' ](function(e) {
        e.preventDefault();

        var text = _getSelection ? doc.getSelection() :
                   selection.createRange().text;
        
        callback(text);
      });
    },

    bindTouch: function() {

    },

    bindMouseUp: function(callback) {
      var bindDOM = function(el) {
        el.addEventListener('mouseup', debounce(callback, 150), false);
      };

      if (!isNodeList(this.element)) {
        bindDOM(this.element);
        return;
      }

      [].forEach.call(this.element, function(item) {
        bindDOM(item);
      });
    }
  };

  global.selecting = function(element, callback) {
    if (!hasSupport) { return; }
    new Selecting(element, callback).events();
    // selectText(element, callback, hasLib);
  };

}(window, document));