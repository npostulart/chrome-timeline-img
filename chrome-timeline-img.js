#!/usr/bin/env node

var path = require('canonical-path');
var pkg = require(path.join(__dirname, 'package.json'));

var convert = require('./lib/convert');

var program = require('commander');

program
  .version(pkg.version)
  .usage('[options] <file> [otherFiles...]')
  // .option('-t, --timestamp', 'Add timestamp to image')
  .option('-f, --filename [value]', 'Base filename for Snapshots [default: snapshot_]', 'snapshot_')
  // .option('-o, --output <path>', 'Folder for output')
  .parse(process.argv);

// console.log(' timestamp: %j', program.timestamp);
// console.log(' args: %j', program.args);

var programOptions = {
  // 'timestamp': false,
  filename: program.filename,
  // output: program.output
};

// console.log(program.filename);
// console.log(program.output);

convert.convert(program.args, programOptions);
