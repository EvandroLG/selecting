describe('selecting', function(){

  describe('instance', function() {
    it('should exists selecting as a function', function(){
      expect(window.selecting).be.an('function');
    });
  });

  describe('action', function() {
    var mockElement = function() {
      var container = document.createElement('div');
      container.className = 'container';
      container.innerHTML = '<p>Hello JavaScript World!</p>';

      return container;
    };

    mockNodeList = function() {
      var firstElement = mockElement();
      var secondElement = mockElement();
      var container = document.getElementById('container-test');

      container.appendChild(firstElement);
      container.appendChild(secondElement);
    };

    var verifyLibrary = function(lib, end) {
      window[lib] = function(value) {
        return this;
      };

      window[lib].prototype = {
        on: function() {
          end();
        }
      };

      window.selecting(new window[lib]('element'), function() {});
    };

    it('should executes function that was passed by parameter after mouseup event was executed', function(end) {
      var method = function() {
        end();
      };

      var element = mockElement();

      window.selecting(element, method);
      element.dispatchEvent(new Event('mouseup'));
    });

    it('should attach event to all objects that are in the nodelist', function() {
      var method = function() {
        end();
      };

      mockNodeList();
      var elements = document.querySelectorAll('.container');

      window.selecting(elements, method);
      elements[0].dispatchEvent(new Event('mouseup'));
    });

    it('should executed on function when jQuery object is passed by parameter', function(end) {
      verifyLibrary('jQuery', end)
    });

    it('should executed on function when Zepto object is passed by parameter', function(end) {
      verifyLibrary('Zepto', end)
    });
  });

});
