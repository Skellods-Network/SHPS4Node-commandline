'use strict';

const meth = require('node-mod-load')('SHPS4Node-commandline').libs.meth;

meth.writeLn = function($str, $mark) {
    this.write($str + '\n', $mark);
};
