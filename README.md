# SelectingText
A simple solution to work with manipulating text selection.

## Instalation
To install SelectingText, execute:

```shell
  bower install selecting
```

Or simply pick up the file from src directory.

## Supported Browsers
* Google Chrome
* Firefox
* Internet Explorer 9.0+
* Safari
* Opera

## How to use?
SelectiongText doesn't depend on jQuery, Zepto or any other library to work. You need just include in end of your HTML code it:

```html
  <script src="selecting-text.js"></script>
```

Then you can call in your code the <code>window.SelectingText</code> function passing two parameters: an DOM element (jQuery object or NodeList) that you would like to listen and a callback that will receive a [Selector](https://developer.mozilla.org/en-US/docs/Web/API/Window.getSelection) objectby parameter.

```js
  window.SelectingText($('.container'), function(selector) {
    ...
  });
```

# Example
[See a simple example](http://evandrolg.github.io/SelectingText).
