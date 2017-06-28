'use strict';


module.exports = class Commandline {

    constructor() { this._init(); };

    static init() { throw new Error('Not implemented: Commandline.init()!'); };

    /**
     * Write a string to the SHPS terminal
     *
     * @param {string} $str
     */
    write($str) { throw 'Not implemented: Commandline.write()!'; };
};
