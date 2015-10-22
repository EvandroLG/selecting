# selecting
A library that allows you to access the text selected by the user.

## Instalation
To install Selecting, execute:

```shell
  npm install selecting
```

Or Bower too:
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
* iOS
* Android

## How to use?
Selecting doesn't depend on jQuery, Zepto or any other library to work. You need just to include it at the end of your HTML code:

```html
  <script src="selecting.js"></script>
```

Then you can call <code>window.selecting</code> function passing two parameters: an DOM element (jQuery object or NodeList) to listen to and a callback function that receive a [Selection](https://developer.mozilla.org/en-US/docs/Web/API/Window.getSelection) object by parameter. For example:

```js
  window.selecting($('.container'), function(selector) {
    // Properties
    selector.text; // The selected text
    selector.wordCount; // The number of words selected
  });
```

## Example
[See a simple example](http://evandrolg.github.io/selecting).

## Contributors
|[![@evandrolg](https://avatars3.githubusercontent.com/u/444054?v=3&amp;s=96)](https://github.com/evandrolg)|[![@felquis](https://avatars2.githubusercontent.com/u/736728?v=3&s=96)](https://github.com/felquis)|[![@gibatronic](https://avatars0.githubusercontent.com/u/819643?v=2&amp;s=96)](https://github.com/gibatronic)|
|:---:|:---:|:---:|
|[@evandrolg](http://www.github.com/evandrolg)|[@felquis](http://www.github.com/felquis)|[@gibatronic](http://www.github.com/gibatronic)|
