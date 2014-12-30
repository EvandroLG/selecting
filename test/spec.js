describe('SelectingText', function(){

  var mockElement = function() {
    var container = document.createElement('div');
    container.id = 'container';
    container.innerHTML = '<p>Hello JavaScript World!</p>';

    return container;
  };

  describe('instance', function() {
    it('should exists SelectingText as a function', function(){
      expect(window.SelectingText).be.an('function');
    });
  });

  describe('action', function() {
    var element = mockElement();

    it('should executes function that was passed by parameter after mouseup event was executed', function(end) {
      var method = function() {
        end();
      };

      window.SelectingText(element, method);
      element.dispatchEvent(new Event('mouseup'));
    });

  });

});