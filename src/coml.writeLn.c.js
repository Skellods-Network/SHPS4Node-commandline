'use strict';

require('../interface/coml.h').prototype.writeLn = function($str) {
    this.write(str + '\n');
};
