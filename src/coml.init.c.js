'use strict';

const Result = require('rustify-js').Result;

const h = require('../interface/coml.h');


h.init = function() {
    return Result.fromSuccess(new h());
};
