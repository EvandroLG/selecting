!function() {
  var $ = function(value) {
    return document.getElementById(value);
  };

  var initialize = function() {
    selecting($('dummy'), selected);
  };

  var selected = function(text) {
    $('selected').innerHTML = 'Selected text: <strong>' + text + '</strong>';
  };

  document.addEventListener('DOMContentLoaded', initialize);
}();
