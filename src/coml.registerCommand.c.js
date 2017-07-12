'use strict';

const readline = require('readline');

const libs = require('node-mod-load')('SHPS4Node-commandline').libs;

const meth = libs.meth;

meth.registerCommand = function($name, $usage, $description, $callback) {
    /**
     * @type {Map}
     */
    const commands = this[libs['coml-sym.h'].registeredCommands];

    if (commands.has($name)) {
        throw new global.VError({
            name: 'CLI command name already exists',
            cause: new Error(`Tried to register a CLI command name which already exists!`),
            info: {
                errno: 'ECLICOMMANDEXISTS',
                command: $name,
            },
        })
    }

    commands.set($namem, {
        usage: $usage,
        description: $description,
        callback: $callback,
    });
};
