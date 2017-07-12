'use strict';

const tk = require('terminal-kit').terminal;
const meth = require('node-mod-load')('SHPS4Node-commandline').libs.meth;

meth.write = function($str) {
    tk($str);
};
