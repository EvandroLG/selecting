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
      if ('ontouchstart' in window) {
        element.each(function () {
          checkForSelections(this, callback);
        });
      } else {
        element.on('mouseup', debounce(callback, 150));
      }

      return;
    }

    var bindDOM = function(el) {
      if ('ontouchstart' in window) {
        checkForSelections(el, callback);
      } else {
        el.addEventListener('mouseup', debounce(callback, 150), false);
      }
    };

    if (!isNodeList(element)) {
      bindDOM(element);
      return;
    }

    [].forEach.call(element, function(item) {
      bindDOM(item);
    });
  };

  // source http://stackoverflow.com/a/5379408
  var getText = function() {
    var text = '';

    if (_getSelection) {
      text = doc.getSelection().toString();
    } else if (document.selection && document.selection.type !== 'Control') {
      text = document.selection.createRange().text;
    }

    return text;
  };

  var selectText = function(element, callback, hasLib) {
    var onMouseUp = function() {
      var text = getText();
      callback(text);
    };

    bind(element, onMouseUp, hasLib);
  };

  /*
    This function detect text selection during a long-press in the screen
  */
  var checkForSelections = function (element, callback) {
    var intervalCheckingForText;

    var selectionStart = function () {
      element.removeEventListener('touchend', selectionEnd, false);
      element.addEventListener('touchend', selectionEnd, false);

      if (intervalCheckingForText) {
        clearInterval(intervalCheckingForText);
      }

      intervalCheckingForText = setInterval(function () {
        var text = getText();

        if (text !== '') {
          callback(text);

          selectionEnd();

          checkForChanges(callback);
        }
      }, 100);
    };

    var selectionEnd = function () {
      clearInterval(intervalCheckingForText);
      element.removeEventListener('touchend', selectionEnd, false);
    };

    element.addEventListener('touchstart', selectionStart, false);
  };

  /*
    Once this function is called, it'll check for changes in the
    current selection string with a setInterval
    Once the selected string is equal '', we stop the setInterval
  */
  var checkForChanges = function (callback) {
    var intervalCheckingForText;
    var currentText = getText();

    intervalCheckingForText = setInterval(function () {
      if (getText() !== currentText) {
        callback(getText());
        currentText = getText();

      } else if (getText() === '') {
        clearInterval(intervalCheckingForText);
      }
    }, 100);
  };

  global.selecting = function(element, callback) {
    if (!hasSupport) { return; }

    var hasLib = global.jQuery && element instanceof global.jQuery ||
                 global.Zepto && element instanceof global.Zepto;

    selectText(element, callback, hasLib);
  };

}(window, document));
