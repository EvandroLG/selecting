(function(global, doc) {

  'use strict';

  var selection = doc.selection;
  var getSelection = doc.getSelection;
  var hasSupport = getSelection || selection;

  var selectText = function(element, callback) {
    var onMouseUp = function(e) {
      e.preventDefault();

      var text = getSelection ? getSelection() :
                 selection.createRange().text;
      
      callback(text);
    };

    element.addEventListener('mouseup', onMouseUp);
  };

  global.SelectText = function(element, callback) {
    if (!hasSupport) return;
    selectText(element, callback);
  };
  
}(window, document));