'use strict';


module.exports = class Commandline {

    constructor() { this._init(); };

    static getInstance() { throw 'Not implemented: Commandline::getInstance'; };

    write($str) { throw 'Not implemented: Commandline::write'; };
};
