JSHINT=./node_modules/jshint/bin/jshint
UGLIFY=./node_modules/uglify-js/bin/uglifyjs
MOCHA_PHANTOM=./node_modules/mocha-phantomjs/bin/mocha-phantomjs

.SILENT:

jshint:
	$(JSHINT) src/selecting-text.js

test_js: jshint
	$(MOCHA_PHANTOM) test/SpecRunner.html

minify:
	$(UGLIFY) src/selecting-text.js --compress --mangle --output src/selecting-text.min.js
	echo "minified!"

deploy: jshint test_js minify
