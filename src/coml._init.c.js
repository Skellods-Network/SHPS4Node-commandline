'use strict';

require('colors');
const nml = require('node-mod-load');
const tk = require('terminal-kit').terminal;

const singleton = require('./singleton.c');


require('../interface/coml.h').prototype._init = function() {

    if (typeof singleton.instance !== 'undefined') {

        throw 'Cannot re-initialize module Commandline!';
    }

    singleton.instance = this;

    this._history = [];

    this.write(
        '\n ' +
        'WELCOME to a world of no worries.'.underline.green.bold + '\n ' +
        'WELCOME to SHPS!'.underline.green.bold + '\n'
    );

    nml('SHPS4Node').libs.main.printVersion();

    this.prompt();
};
