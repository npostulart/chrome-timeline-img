'use strict';

var fs = require('fs');
var path = require('canonical-path');
var _ = require('lodash');
var clc = require('cli-color');

var cliError = clc.red.bold;

var options;
var output = {};

var mkdirP = function(folder) {
  var folderSegments = folder.split(path.sep);

  _.forEach(folderSegments, function(segment, key) {
    var mkdirPath = '/';

    if (key > 1) {
      mkdirPath = folderSegments.slice(0, key + 1).join('/');
    }

    if (!fs.existsSync(mkdirPath)) {
      fs.mkdirSync(mkdirPath);
    }
  });
};

var convertData = function(file, programOptions) {
  var fileName = path.resolve(file);

  options = programOptions || {};

  if (!options.filename) {
    options.filename = 'snapshot_';
  }

  var extension = path.extname(file);
  options.output = fileName.substring(0, fileName.lastIndexOf(extension));

  if (options.output.substr(-1) != '/') {
    options.output += '/';
  }

  mkdirP(options.output);

  var content = fs.readFileSync(fileName, 'utf8');

  var json = JSON.parse(content);

  var frames = getCapturedFrames(fileName);

  writeImages(frames);

  output.file = fileName;
  output.folder = options.output;

  return output;
};

var parseFrameTime = function(time) {
  time = time / 1e6;

  return time.toFixed(3);
};

var writeImage = function(fileName, data) {
  var imageData = new Buffer(data, 'base64');

  try {
    fs.writeFileSync(fileName, imageData, 'base64');
    output.frames = output.frames || [];
    output.frames.push(fileName);
  } catch (e) {
    console.log(cliError(e));
  }
};

var writeImages = function(frames) {
  _.forEach(frames, function(frame, key) {
    var fileName = parseFrameTime(frame.ts - frames[0].ts).replace('.', '');
    var filePath = options.output + options.filename + fileName + '.png';
    var data = frame.args.snapshot;

    writeImage(filePath, data);
  });
};

var getCapturedFrames = function(fileName) {
  var content = fs.readFileSync(fileName, 'utf8');
  var fileData = JSON.parse(content);

  var capturedFrames = fileData.filter(function(el) {
    if (el['name'] === 'Screenshot') {
      return el;
    }
  });

  return capturedFrames;
};

var logOutput = function() {
  var count = output.frames.length;

  console.log(clc.white('Extracted'), clc.green(count), clc.white('frames from'), clc.yellow(output.file));
  console.log(clc.white('  in'), clc.cyan(output.folder));

  output = {};
}

module.exports = {
  convert: function(files, options) {
    if (_.isArray(files)) {
      _.forEach(files, function(file) {
        convertData(file, options);
        logOutput();
      });
    } else {
      convertData(files, options);
      logOutput();
    }
  }
};
