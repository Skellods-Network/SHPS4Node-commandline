'use strict';

const h = require('../interface/coml.h');
const singleton = require('./singleton.c');


h.getInstance = function() {

    if (typeof singleton.instance === 'undefined') {

        singleton.instance = new h();
    }

    return singleton.instance;
};
