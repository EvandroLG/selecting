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
      var getText = this.getText;

      this[ this.isTouch ? 'bindTouch' : 'bindMouseUp' ](function(event) {  
        var text = getText(),
            // Transform 'a   a' into 'a a'
            removeSpaces = text.replace(/\s+(?=\s)/g,''),
            wordCount = (text !== '')? removeSpaces.split(' ').length : 0;

        callback({
          'text': text,
          'wordCount': wordCount,
          'event': event
        });
      });
    },

    // source http://stackoverflow.com/a/5379408
    getText: function() {
      var text = '';

      if (_getSelection) {
        text = global.getSelection().toString();
      } else if (doc.selection && doc.selection.type !== 'Control') {
        text = doc.selection.createRange().text;
      }

      return text;
    },

    checkForSelections: function (element, getText, callback) {
      var intervalCheckingForText;

      var checkForChanges = function (callback) {
        var currentText = getText();

        var intervalCheckingForText = setInterval(function () {
          if (getText() !== currentText) {
            callback(getText());
            currentText = getText();

          } else if (getText() === '') {
            clearInterval(intervalCheckingForText);
          }
        }, 100);
      };

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
    },

    bindTouch: function(callback) {
      var checkForSelections = this.checkForSelections;
      var getText = this.getText;

      if (this.hasLib) {
        this.element.each(function () {
          checkForSelections(this, getText, callback);
        });

        return;
      }

      var bindDOM = function(el) {
        checkForSelections(el, getText, callback);
      };

      if (!isNodeList(this.element)) {
        bindDOM(this.element);
        return;
      }

      [].forEach.call(this.element, function(item) {
        bindDOM(item);
      });
    },

    bindMouseUp: function(callback) {
      if (this.hasLib) {
        this.element.on('mouseup', debounce(callback, 150));
        return;
      }

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
  };

}(window, document));
