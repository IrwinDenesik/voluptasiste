// Generated by CoffeeScript 1.6.2
var docblock, isJSXExtensionRe, parsePragma, react, through;

react = require('react-tools');

docblock = require('react-tools/vendor/fbtransform/lib/docblock');

through = require('through');

isJSXExtensionRe = /^.+\.jsx$/;

parsePragma = function(data) {
  return docblock.parseAsObject(docblock.extract(data));
};

module.exports = function(file) {
  var compile, data, write;

  data = '';
  write = function(chunk) {
    return data += chunk;
  };
  compile = function() {
    var e, isJSXExtension, isJSXPragma, transformed;

    isJSXExtension = isJSXExtensionRe.exec(file);
    isJSXPragma = parsePragma(data).jsx != null;
    if (isJSXExtension || isJSXPragma) {
      if (isJSXExtension && !isJSXPragma) {
        data = '/** @jsx React.DOM */' + data;
      }
      try {
        transformed = react.transform(data);
      } catch (_error) {
        e = _error;
        this.emit('error', e);
      }
      this.queue(transformed);
    } else {
      this.queue(data);
    }
    return this.queue(null);
  };
  return through(write, compile);
};
