'use strict';

const readline = require('readline');

const libs = require('node-mod-load')('SHPS4Node-commandline').libs;
const tk = require('terminal-kit').terminal;

const commands = {};
const meth = libs.meth;

meth.executeLine = function($line) {
    const regComms = this[libs['coml-sym.h'].registeredCommands];
    const line = $line.trim();
    const state = this[libs['coml-sym.h'].state];

    if (line === '') {
        state.interface.prompt(true);
        return;
    }

    const tokens = line.split(' ');
    const args = tokens.slice(1).unshift(state);
    if (commands[tokens[0]]) {
        commands[tokens[0]].apply(this, args);
    }
    else if (regComms.has(tokens[0])) {
        regComms.get(tokens[0]).callback.apply(undefined, args);
    }
    else {
        this.writeLn(`There is no command "${tokens[0]}"`);
    }

    state.interface.prompt(true);
};

commands.clear = commands.cls = commands.clr = function($state) {
    tk.clear();
    tk.column(0);
    $state.interface.prompt(true);
};

commands.help = function() {
    let coms = '';
    this[libs['coml-sym.h'].registeredCommands].forEach($com => {
        coms +=
            '  ' + $com.usage +
            '  ------------------------' +
            ($com.description.match(/[\s\S]{1,80}/g) || []).reduce(($acc, $l) => `${$acc}\n  ${$l}`, '')
        ;
    });

    this.writeLn(`
  Usage: command [options...]
  
  The SHPS CLI supports the following core commands:
  
  clear | cls | clr
  ------------------------
  Empty screen
  
  help
  ------------------------
  Display this help text
  
  version
  ------------------------
  Display version information about internal NodeJS dependencies,
  SHPS modules and plugins
  
  
  Additionally, the following commands are registered at the moment:

${coms}
`);
};

commands.version = function() {
    const v = process.versions;
    for (let lib in v) {
        if (v.hasOwnProperty(lib) && typeof v[lib] === 'string') {
            this.writeLn(` INT: ${lib} - ${v[lib]}`);
        }
    }

    // todo: write versions of SHPS modules and plugins
};
