'use strict';

const tk = require('terminal-kit').terminal;
const libs = require('node-mod-load')('SHPS4Node-commandline').libs;

const meth = libs.meth;

meth.write = function($str) {
    const state = this[libs['coml-sym.h'].state];
    if (state.mode === 0) {
        tk($str);
        return;
    }

    tk.eraseLine();
    tk.column(0);
    tk($str);
    state.interface.prompt(true);
};
