/*
  * SelectingText - Simple lib for manipulating text selection
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

  var bind = function(element, callback, hasLib) {
    hasLib ? element.on('mouseup', onMouseUp) :
             element.addEventListener('mouseup', onMouseUp, false);
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
    if (!hasSupport) return;

    selectText(element, callback, element instanceof jQuery || 
                                  element instanceof Zepto);
  };
  
}(window, document));
