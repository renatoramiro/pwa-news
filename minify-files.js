var compressor = require('node-minify');
 
// Using Google Closure Compiler

compressor.minify({
  compressor: 'no-compress',
  input: ['js/api.js', 'js/battery.js', 'js/install-banner.js', 'js/network-status.js', 'js/push.js'],
  output: 'build/build.js',
  callback: function (err, min) {}
});

compressor.minify({
  compressor: 'gcc',
  input: 'build/*.js',
  output: 'build/build.js',
  callback: function (err, min) {}
});

compressor.minify({
  compressor: 'clean-css',
  input: 'build/build.css',
  output: 'build/build.css',
  callback: function (err, min) {}
});