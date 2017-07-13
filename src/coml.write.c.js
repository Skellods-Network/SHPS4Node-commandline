'use strict';

const chalk = require('chalk');
const tk = require('terminal-kit').terminal;
const libs = require('node-mod-load')('SHPS4Node-commandline').libs;

const meth = libs.meth;

meth.write = function($str, $mark) {
    const state = this[libs['coml-sym.h'].state];

    state.currentMark = $mark;
    if (state.mode === 0) {
        tk($str.toString());
        return;
    }

    tk.eraseLine();
    tk.column(0);
    tk($str.toString());
    state.interface.prompt(true);
};

meth.writeError = function($str, $mark) {
    const line = ($str instanceof Error || $str.toString().startsWith('Error:'))
        ? $str.toString()
        : 'Error: ' + $str
    ;

    this.writeLn(chalk.yellow.bold(line), $mark);
};

meth.writeLn = function($str, $mark) {
    this.write($str + '\n', $mark);
};

meth.writeWarning = function($str, $mark) {
    this.writeLn(chalk.yellow.bold(`Warning: ${$str}`), $mark);
};
