'use strict';

const readline = require('readline');

const libs = require('node-mod-load')('SHPS4Node-commandline').libs;
const tk = require('terminal-kit').terminal;

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
        commands[tokens[0]].apply(this, tokens.slice(1).unshift(state));
    }
    else {
        // todo: first propagate the command to all SHPS modules, then to all plugins
        this.writeLn(`There is no command "${tokens[0]}"`);
    }

    state.interface.prompt(true);
};

commands.clear = commands.cls = commands.clr = function($state) {
    tk.clear();
    tk.column(0);
    $state.interface.prompt(true);
};

commands.exit = function() {
    // todo: this should be in main
    process.exit();
};

commands.help = function() {
    // todo: collect command information from other modules
    this.writeLn(`
  Usage: command [options...]
  
  The SHPS CLI supports the following core commands:
  
  clear | cls | clr
  ------------------------
  Empty screen
  
  exit
  ------------------------
  Shutdown SHPS
  
  help
  ------------------------
  Display this help text
  
  version
  ------------------------
  Display version information about internal NodeJS dependencies,
  SHPS modules and plugins
  
  There are additional commands to control the DB, pipelines, etc.
  Please refer to the manual to find out more about them
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
