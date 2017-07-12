'use strict';

const mix = require('mics').mix;
const nml = require('node-mod-load');

const meth = nml('SHPS4Node-commandline').libs.meth;
const mixins = nml('SHPS4Node').libs.main.mixins;

module.exports = mix(mixins.base, mixins.init, superclass => class Commandline extends superclass {

    constructor() { super(); meth._init.call(this); }

    static init() { return meth.init(); }

    /**
     * Interpret and execute a SHPS CLI command
     *
     * @param {string} $line
     */
    executeLine($line) { throw new Error('Not implemented: Commandline.executeLine()!'); }

    /**
     * Change commandline from output-only mode to in/out mode
     *
     * @param {string} $prompt Defaults to "> " (optional)
     */
    startInputMode($prompt) { throw new Error('Not implemented: Commandline.writeLn()!'); }

    /**
     * Write a string to the SHPS terminal
     *
     * @param {string} $str
     */
    write($str) { throw new Error('Not implemented: Commandline.write()!'); }

    /**
     * Write a string to the terminal and append a new-line
     *
     * @param {string} $str
     */
    writeLn($str) { throw new Error('Not implemented: Commandline.writeLn()!'); }
});
