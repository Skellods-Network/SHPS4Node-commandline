'use strict';

const tk = require('terminal-kit').terminal;
const Class = Object.getPrototypeOf(require('../interface/coml.h'));

Class.write = function($str) {
    tk($str);
};
