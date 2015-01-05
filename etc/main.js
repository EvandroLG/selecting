document.addEventListener('DOMContentLoaded', function() {

  var $ = function(value) {
    return document.getElementById(value);
  };

  window.SelectingText($('container'), function(selector) {
    $('selected-text').value = selector;
  });

}, false);
