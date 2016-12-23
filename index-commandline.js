'use strict';

const nml = require('node-mod-load')('SHPS4Node-commandline');

nml.addDir('interface');
nml.addDir('src');

module.exports = nml.libs['coml.h'];
