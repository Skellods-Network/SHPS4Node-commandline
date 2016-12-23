'use strict';

const tk = require('terminal-kit').terminal;


require('../interface/coml.h').prototype.write = function($str) {

    tk($str);
};
