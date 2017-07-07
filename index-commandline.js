'use strict';

const path = require('path');

const mix = require('mics').mix;
const nml = require('node-mod-load');

const mixins = nml('SHPS4Node').libs._mixins;
const nmlComl = nml('SHPS4Node-commandline');

nmlComl.addDir(__dirname + path.sep + 'interface', true);
nmlComl.addDir(__dirname + path.sep + 'src', true);

module.exports = mix(nmlComl.libs['coml.h'], mixins.base, mixins.init);
