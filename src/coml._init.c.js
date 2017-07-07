'use strict';

const chalk = require('chalk');
const Class = Object.getPrototypeOf(require('../interface/coml.h'));
const nml = require('node-mod-load');
const VError = require('verror').VError;


let initialized = false;

Class._init = function() {
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

    this._history = [];
};
