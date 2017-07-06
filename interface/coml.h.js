'use strict';

module.exports = superclass => class Commandline extends superclass {

    constructor() { super(); this._init(); };

    static init() { throw new Error('Not implemented: Commandline.init()!'); };

    /**
     * Write a string to the SHPS terminal
     *
     * @param {string} $str
     */
    write($str) { throw 'Not implemented: Commandline.write()!'; };

    /**
     * Write a string to the terminal and append a new-line
     *
     * @param {string} $str
     */
    writeLn($str) { throw 'Not implemented: Commandline.writeLn()!'; }
};
