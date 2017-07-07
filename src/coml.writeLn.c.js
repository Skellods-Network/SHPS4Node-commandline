'use strict';

const Class = Object.getPrototypeOf(require('../interface/coml.h'));

Class.writeLn = function($str) {
    this.write($str + '\n');
};
