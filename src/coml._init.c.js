'use strict';

const chalk = require('chalk');
const nml = require('node-mod-load');
const VError = require('verror').VError;


let initialized = false;

require('../interface/coml.h').prototype._init = function() {
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
