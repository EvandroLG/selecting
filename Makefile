JSHINT=./node_modules/jshint/bin/jshint
UGLIFY=./node_modules/uglify-js/bin/uglifyjs
MOCHA_PHANTOM=./node_modules/mocha-phantomjs/bin/mocha-phantomjs
LINTSPACES=./node_modules/lintspaces-cli/index.js

.SILENT:

lintspaces:
	$(LINTSPACES) --editorconfig .editorconfig *.* **/*.* .jshintrc .editorconfig

jshint:
	$(JSHINT) src/selecting.js

test_js:
	$(MOCHA_PHANTOM) test/SpecRunner.html

minify:
	$(UGLIFY) src/selecting.js --mangle --output src/selecting.min.js
	echo "minified!"

deploy: jshint lintspaces test_js minify
	echo "deployed!"
