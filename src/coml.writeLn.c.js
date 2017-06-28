'use strict';

require('../interface/coml.h').prototype.write = function($str) {
    let str = $str;
    if (!str.endsWith('\n')) {
        str += '\n';
    }

    this.write(str);
};
