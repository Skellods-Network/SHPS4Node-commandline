'use strict';

const readline = require('readline');

const libs = require('node-mod-load')('SHPS4Node-commandline').libs;

const commands = {};
const meth = libs.meth;

meth.executeLine = function($line) {
    const state = this[libs['coml-sym.h'].state];

    const tokens = $line.trim().split(' ');
    if (commands[tokens[0]]) {
        commands[tokens[0]].apply(this, tokens.slice(1));
    }
};

commands.version = function() {
    process.versions.forEach($v => {
        this.writeLn(` INT: ${$v}`);
    });

    // todo: write versions of SHPS modules and plugins
};
