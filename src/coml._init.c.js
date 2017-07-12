'use strict';

const meth = require('node-mod-load')('SHPS4Node-commandline').libs.meth;
const VError = require('verror').VError;

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

    this._history = [];

    Object.assign(this, meth);
};
