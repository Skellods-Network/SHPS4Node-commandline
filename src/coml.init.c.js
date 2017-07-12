'use strict';

const libs = require('node-mod-load')('SHPS4Node-commandline').libs;
const Result = require('rustify-js').Result;

libs.meth.init = function() {
    return Result.fromSuccess(new (libs['coml.h'])());
};
