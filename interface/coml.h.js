'use strict';

const mix = require('mics').mix;
const nml = require('node-mod-load');

const meth = nml('SHPS4Node-commandline').libs.meth;
const mixins = nml('SHPS4Node').libs.main.mixins;

module.exports = mix(mixins.mixBase, mixins.mixInit, superclass => class Commandline extends superclass {

    constructor() { super(); meth._init(); };

    static init() { return meth.init(); };

    /**
     * Write a string to the SHPS terminal
     *
     * @param {string} $str
     */
    write($str) { throw new Error('Not implemented: Commandline.write()!'); };

    /**
     * Write a string to the terminal and append a new-line
     *
     * @param {string} $str
     */
    writeLn($str) { throw new Error('Not implemented: Commandline.writeLn()!'); }
});
