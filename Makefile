JSHINT=./node_modules/jshint/bin/jshint
UGLIFY=./node_modules/uglify-js/bin/uglifyjs
MOCHA_PHANTOM=./node_modules/mocha-phantomjs/bin/mocha-phantomjs

.SILENT:

jshint:
	$(JSHINT) src/selecting.js

test_js:
	$(MOCHA_PHANTOM) test/SpecRunner.html

minify:
	$(UGLIFY) src/selecting.js --mangle --output src/selecting.min.js
	echo "minified!"

deploy: jshint test_js minify
	echo "deployed!"
