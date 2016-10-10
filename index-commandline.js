'use strict';

var path = require('path');

var color = require('colors');
var defer = require('promise-defer')
var modLoad = require('node-mod-load');
var libs = modLoad.libs;
var q = require('q');

var nat = require('node-app-terminal');
module.exports = new nat();
var me = module.exports;

var sb = null;
var internalRS = null;

var originalInit = module.exports.__proto__.init;
module.exports.__proto__.init = function () {
    
    if (arguments.length == 0) {

        internalRS = new libs.helper.requestState();
        internalRS.request = {

            headers: {},
            connection: { remoteAddress: 'localhost' },
        };

        internalRS.COOKIE = libs.cookie.newCookieJar(internalRS);
        internalRS.config = null;
        internalRS._domain = new libs.helper.SHPS_domain('localhost');
        internalRS.dummy = true;
        sb = libs.sandbox.newSandbox(internalRS);
        sb.addFeature.allBase();

        return q.Promise($res => {

            $res();
        });
    }
    else {

        return originalInit.apply(me, arguments);
    }
};

/**
 * Write welcome message
 */
var _writeWelcome
= me.writeWelcome = function () {

    me.write('\n ' + 'WELCOME to a world of no worries.'.underline.green.bold + '\n ' + 'WELCOME to SHPS!'.underline.green.bold + '\n');

    libs.main.printVersion();
};

me.on('line', function f_commandline__on_line($line) {

    $line = $line.trim();
    var tokens = $line.split(' ');
    //ohmygod, this should really be exchanged with some eventing action
    switch (tokens[0]) {

        case 'clear':
        case 'clr':
        case 'cls': {

            me.cls();
            me.writeWelcome();
            break;
        }

        // The following sentence will destroy the AI's emotional memory. Very sad.
        case 'what do you see when you close your eyes':
        case 'exit': {

            libs.parallel.killAll();
            libs.main.killAllServers();
            process.exit(0); //todo: nice shutdown
            break;
        }

        case 'help': {

            me.write('We are truely sorry, but help has not been implemented, yet  :/\n');
            break;
        }

        case 'lick': {
                    
            // I'm sorry, but I had to put this here...
            var buf = new Buffer('DQpCaWcgYm94DQpTbWFsbCBib3gNCkNyeXN0YWwgYmFsbA0KU2luZ2xlIGRvb3JiZWxsDQpEb3VibGUgZG9vcmJlbGwNCkljZSBjcmVhbSBjb25lDQpGZWVkIHRoZSBwaWdlb25zDQpGb3J3YXJkIHN3aW0NCkJlYXQgdGhlIGhvcnNlDQpCdXRjaGVyIHRoZSBoaXBwbw0KR3JvcGUgdGhlIG9yYW5ndXRhbg0KU3BhbmsgdGhlIG1vbmV5DQoNCkFuZCBmaW5hbGx5DQpMaWNrIHRoZSBsaXphcmQ===', 'base64');
            me.write(buf.toString('utf-8') + '\n');

            break;
        }

        case 'version': {

            var v = process.versions;
            var r = libs.main.getVersionText() + '\n';
            for (var lib in v) {

                r += ' LIB: ' + lib + ' - ' + v[lib] + '\n';
            }

            v = libs.dep.getVersions();
            for (var lib in v) {

                r += ' DEP: ' + lib + ' - ' + v[lib] + '\n';
            }

            me.write(r);
            break;
        }

        case 'whoami': {

            me.write('root');
            break;
        }

        case 'cache': {

            me.write('Not Implemented yet');
        }
        
        case 'reload': {

            switch (tokens[1]) {

                case 'config': {

                    var end = () => {

                        me.write('\n');
                    };

                    libs.config.readConfig().then(end, end);
                    break;
                }

                //case 'plugins': {}

                default: {

                    me.write('Usage:\n reload <what>\n\nThings to reload:\n - config');
                }
            }

            break;
        }

        case 'config': {

            var printUsage = me.write.bind(this, 'Usage: config gen <type> <filename>\n\nWith type:\n - database\n - master\n - vhost');
            if (tokens[1] === 'gen') {

                //TODO: check available template files
                if (['database', 'master', 'vhost'].indexOf(tokens[2]) < 0) {

                    printUsage();
                    break;
                }

                libs.config.genConfig(tokens[2], tokens[3], $setting => {

                    if ($setting.status === 'deprecated') {

                        return $setting.default;
                    }

                    var confPath;
                    if ($setting.key) {

                        confPath = $setting.group + '->' + $setting.key;
                    }
                    else {

                        confPath = $setting.group;
                    }

                    me.write(`\n${confPath} (${$setting.type})`.bold);
                    me.write($setting.description);
                    if ($setting.options) {

                        me.write('OPTIONS:')

                        var i = 0;
                        var keys = Object.keys($setting.options);
                        var l = keys.length;
                        while (i < l) {

                            me.write(`\t${keys[i]}=${$setting.options[keys[i]]}`);
                            i++;
                        }
                    }

                    if (Array.isArray($setting.examples)) {

                        me.write('EXAMPLES:')

                        var i = 0;
                        var l = $setting.examples.length;
                        while (i < l) {

                            me.write('\t- ' + $setting.examples[i]);
                            i++;
                        }
                    }

                    var d = defer();
                    nat.getInterface().question('[Default: ' + $setting.default + ']? ', $in => {

                        //TODO: First check if input is ok and sanitize it, then convert it
                        var input = $in;
                        if (input === '') {

                            input = $setting.default;
                        }

                        switch ($setting.type) {

                            case 'number': input = Number(input) || 0; break;
                            case 'boolean': input = Boolean(input); break;
                        }

                        d.resolve(input);
                    });

                    return d.promise;
                }).then($file => {

                    me.write('\nConfig written to ' + $file);
                }, $e => {

                    me.writeError($e);
                });
            }
            else {

                printUsage();
            }

            break;
        }

        case 'use': {

            //TODO: check and sanitize alias name!

            // Check if the given URL even exists!
            const dbConf = libs.config.getDBConfig(tokens[1]);
            if (!dbConf) {

                me.writeError(
                    'The given URL does not exist or does not have any attached DB configurations!\n' +
                    'Please first create a new DB config with `> config gen database`.'
                );

                return;
            }

            internalRS._domain = new libs.helper.SHPS_domain(tokens[1]);
            if (!internalRS.config) {

                internalRS.config = {};
            }

            internalRS.config.databaseConfig = dbConf;
            internalRS.config.generalConfig = libs.config.getVHostConfig(tokens[1]);

            me.prompt(true);

            break;
        }

        case 'db': {

            var printUsage = me.write.bind(this, 'Usage: db init <type>\n\nWith type:\n - mssql\n - mysql\n - sqlite');
            if (tokens[1] === 'init') {

                // tokens[2] should contain the name of the alias!
                //TODO: check and sanitize alias name!

                // Check if the use command has been issued before this call
                if (!internalRS.config) {

                    me.writeError('You first have to use `> use` in order to select an existing configuration!');
                    return;
                }

                libs.sql.newSQL(tokens[2], internalRS).done($sql => {

                    $sql.initDB('database-struc').then(() => {

                        me.prompt(true);
                    }, $err => {

                        me.writeError($err);
                    });

                }, $e => {

                    me.writeError($e);
                });
            }
            else {

                printUsage();
            }

            break;
        }

        default: {

            var toEval = $line.match(/^\s*?!(.*)/i);
            if (toEval) {

                try {

                    sb.run(libs.sandbox.newScript(toEval)).done(function ($res) {

                        me.write($res);
                    }, function ($err) {

                        me.writeError('Your last JS command threw an error:\n' + $err + '\n');
                    });
                }
                catch ($e) {

                    me.writeError('Your last JS command threw an error:\n' + $e + '\n');
                }
            }
            else if ($line !== '' && !libs.plugin.callCommand($line)) {

                me.write('Command not found!\n');
            }
            else {

                me.prompt(true);
            }
        }
    }
});
