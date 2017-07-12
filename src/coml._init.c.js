'use strict';

const libs = require('node-mod-load')('SHPS4Node-commandline').libs;
const Option = require('rustify-js').Option;
const VError = require('verror').VError;

const meth = libs.meth;
let initialized = false;

meth._init = function() {
    if (initialized) {
        throw new VError({
            name: 'Already initialized!',
            cause: new Error('Cannot re-initialize module Commandline!'),
            info: {
                errno: 'EALREADYINITIALIZED',
            },
        });
    }

    initialized = true;

    this[libs['coml-sym.h'].registeredCommands] = new Map();
    this[libs['coml-sym.h'].state] = {
        history: [],
        interface: Option.fromNone(),
        mode: 0,
        prompt: '> ',
    };

    Object.assign(this, meth);
};
