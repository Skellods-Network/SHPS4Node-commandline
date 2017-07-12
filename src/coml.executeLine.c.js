'use strict';

const readline = require('readline');

const libs = require('node-mod-load')('SHPS4Node-commandline').libs;

const commands = {};
const meth = libs.meth;

meth.executeLine = function($line) {
    const line = $line.trim();
    const state = this[libs['coml-sym.h'].state];

    if (line === '') {
        state.interface.prompt(true);
        return;
    }

    const tokens = line.split(' ');
    if (commands[tokens[0]]) {
        commands[tokens[0]].apply(this, tokens.slice(1));
    }
    else {
        this.writeLn(`There is no command "${tokens[0]}"`);
    }

    state.interface.prompt(true);
};

commands.version = function() {
    const v = process.versions;
    for (let lib in v) {
        if (v.hasOwnProperty(lib) && typeof v[lib] === 'string') {
            this.writeLn(` INT: ${v[lib]}`);
        }
    }

    // todo: write versions of SHPS modules and plugins
};
