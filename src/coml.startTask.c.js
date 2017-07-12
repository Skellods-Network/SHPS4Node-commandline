'use strict';

const chalk = require('chalk');
const libs = require('node-mod-load')('SHPS4Node-commandline').libs;
const rand = require('randomstring').generate;

const meth = libs.meth;

meth.startTask = function($name) {
    const mark = 'task_' + $name + rand(5);
    const rxRemoveEscapes = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
    const self = this;
    const state = this[libs['coml-sym.h'].state];

    this.writeLn(chalk.bold(`\n${$name}...`), mark);
    return {
        _startTime: process.hrtime()[1],

        result: {
            ok: chalk.green.bold('OK'),
            warning: chalk.yellow.bold('WARNING'),
            error: chalk.red.bold('ERROR'),
        },

        end: function f_commandline_newTask_end($result) {
            const time = (process.hrtime()[1] - this._startTime) / 1000000 |0;
            const rl = time.toString().length + $name.replace(rxRemoveEscapes, '').length + $result.replace(rxRemoveEscapes, '').length + 9;
            const l = process.stdout.columns - rl;
            let i = 0;
            let space = '';

            while (i < l) {

                space += ' ';
                i++;
            }

            self.writeLn($name + ': ' + time + 'ms' + space + '[ ' + $result + ' ]', mark + '_end');
        },

        interim: function f_commandline_newTask_interim($result, $message) {
            let star = '*';
            switch ($result) {
                case this.result.ok: {
                    star = chalk.green.bold(star);
                    break;
                }

                case this.result.warning: {
                    star = chalk.yellow.bold(star);
                    break;
                }

                case this.result.error: {
                    star = chalk.red.bold(star);
                    break;
                }
            }

            const rl = $name.replace(rxRemoveEscapes, '').length + 1;
            const l = 30 - rl;
            let i = 0;
            let space = '';

            while (i < l) {
                space += ' ';
                i++;
            }

            if (state.currentMark !== mark) {
                self.writeLn(chalk.cyan.bold('┌') + $name, mark);
                self.writeLn(chalk.cyan.bold('└┤') + ' ' + star + ' ' + $message, mark);
            }
            else {
                self.writeLn(chalk.cyan.bold(' │') + ' ' + star + ' ' + $message, mark);
            }
        },
    };
};
