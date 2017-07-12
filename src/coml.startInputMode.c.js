'use strict';

const readline = require('readline');

const libs = require('node-mod-load')('SHPS4Node-commandline').libs;

const meth = libs.meth;

meth.startInputMode = function($prompt) {
    const state = this[libs['coml-sym.h'].state];

    if (typeof $prompt === 'string') {
        state.prompt = $prompt;
    }

    state.interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    state.interface.on('line', this.executeLine);
    state.interface.setPrompt(state.prompt);
    state.mode = 1;

    state.interface.prompt(false);
};
