'use strict';

require('../interface/coml.h').prototype.writeLn = function($str) {
    let str = $str;
    if (!str.endsWith('\n')) {
        str += '\n';
    }

    this.write(str);
};
