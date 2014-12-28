UGLIFY=node_modules/uglify-js/bin/uglifyjs

.SILENT:

minify:
	node_modules/uglify-js/bin/uglifyjs src/selecting-text.js --compress --mangle --output src/selecting-text.min.js
	echo "minified!"