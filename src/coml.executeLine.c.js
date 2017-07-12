'use strict';

const readline = require('readline');

const nml = require('node-mod-load');
const tk = require('terminal-kit').terminal;

const commands = {};
const libs = nml('SHPS4Node-commandline').libs;
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
    const args = tokens.slice(1);

    args.unshift(state);
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
            `  ${$com.usage}\n` +
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

    const vSHPS = nml('SHPS4Node').versions || {};
    for (let lib in vSHPS) {
        if (['main'].includes(lib) || lib.startsWith('_')) {
            continue;
        }

        if (vSHPS.hasOwnProperty(lib) && typeof vSHPS[lib] === 'string') {
            this.writeLn(` SYS: ${lib} - ${vSHPS[lib] || 'unknown'}`);
        }
    }

    // todo: write versions of plugins
    const vPlugins = {};
    for (let lib in vPlugins) {
        if (vPlugins.hasOwnProperty(lib) && typeof vPlugins[lib] === 'string') {
            this.writeLn(` PLG: ${lib} - ${vPlugins[lib] || 'unknown'}`);
        }
    }
};
