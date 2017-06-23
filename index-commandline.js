'use strict';

const path = require('path');

const nml = require('node-mod-load')('SHPS4Node-commandline');

nml.addDir(__dirname + path.sep + 'interface');
nml.addDir(__dirname + path.sep + 'src');

module.exports = nml.libs['coml.h'];
