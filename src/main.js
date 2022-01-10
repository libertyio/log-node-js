/*!
Copyright (C) 2020 Liberty Infrasystems LLC. All rights reserved.
*/

import colors from '@libertyio/colors-node-js';

/*
The `enable` option controls which methods produce output -- default is all of them. To
customize, pass an object containing the level as key and enabled as value (true or false).
enable:
    error: true
    warn: true
    info: true
    ok: true
    trace: true
    print: true

color:
    error: red
    warning: yellow
    info: blue
    ok: green
    trace: gray
    print: default color

stream:
    default is process.stderr
    possible values include process.stderr and process.stdout

withLevel:
    error, warn, info, ok, trace: '[tag] <level>'
    print: none

newlines:
    error, warn, info, ok, trace, print: always add a newline

    NOTE: if you need output control of newlines
    then just use process.stdout.write directly.
*/

class Log {
    constructor(options = {}) {
        const {
            tag = null,
            withLevel = true,
            level = 'info',
            enable = {}, // can set any of 'error', 'warn', 'info', 'ok', 'trace', 'print' here to override level defaults
            /* color = null, */
            stream = process.stderr,
        } = options;

        let enabled;

        switch (level) {
        case 'error':
            enabled = {
                error: true, warn: false, ok: false, info: false, trace: false, print: true, ...enable,
            };
            break;
        case 'warn':
            enabled = {
                error: true, warn: true, ok: false, info: false, trace: false, print: true, ...enable,
            };
            break;
        case 'ok':
            enabled = {
                error: true, warn: true, ok: true, info: false, trace: false, print: true, ...enable,
            };
            break;
        case 'info':
            enabled = {
                error: true, warn: true, ok: true, info: true, trace: false, print: true, ...enable,
            };
            break;
        case 'trace':
            enabled = {
                error: true, warn: true, ok: true, info: true, trace: true, print: true, ...enable,
            };
            break;
        default:
            // if level is invalid, default to info and display a warning
            enabled = {
                error: true, warn: true, ok: true, info: true, trace: false, print: true, ...enable,
            };
            stream.write(colors.yellow(`LOG: invalid log level selected: ${level}\n`));
            break;
        }

        const formatWithTagLevelText = function formatWithTagLevelText(textLevel, text) {
            return `[${tag}] ${textLevel}: ${text}\n`;
        };
        const formatWithTagText = function formatWithTagText(textLevel, text) {
            return `[${tag}] ${text}\n`;
        };
        const formatWithLevelText = function formatWithLevelText(textLevel, text) {
            return `${textLevel}: ${text}\n`;
        };
        const formatWithText = function formatWithText(textLevel, text) {
            return `${text}\n`;
        };

        // pick the format just once
        let format; let
            printFormat;
        if (tag && withLevel) {
            format = formatWithTagLevelText;
            printFormat = formatWithTagText;
        } else if (tag) {
            format = formatWithTagText;
            printFormat = formatWithTagText;
        } else if (withLevel) {
            format = formatWithLevelText;
            printFormat = formatWithText;
        } else {
            format = formatWithText;
            printFormat = formatWithText;
        }

        const traceExtraParams = (params) => {
            if (Array.isArray(params)) {
                for (let i = 0; i < params.length; i += 1) {
                    if (typeof params[i] === 'object' && typeof params[i].stack === 'string') {
                        // stream.write(colors.gray(format('trace', `[${i+1}] ${params[i].stack}`)));
                        this.trace(`[${i + 1}] ${params[i].stack}`);
                    } else {
                        // stream.write(colors.gray(format('trace', `[${i+1}] ${JSON.stringify(params[i])}`)));
                        this.trace(`[${i + 1}] ${JSON.stringify(params[i])}`);
                    }
                }
            }
        };

        this.error = function error(arg, ...params) {
            if (enabled.error) {
                stream.write(colors.red(format('error', arg)));
                traceExtraParams(params);
            }
        };

        this.warn = function warn(arg, ...params) {
            if (enabled.warn) {
                stream.write(colors.yellow(format('warn', arg)));
                traceExtraParams(params);
            }
        };

        this.ok = function ok(arg, ...params) {
            if (enabled.ok) {
                stream.write(colors.green(format('ok', arg)));
                traceExtraParams(params);
            }
        };

        this.info = function info(arg, ...params) {
            if (enabled.info) {
                stream.write(colors.blue(format('info', arg)));
                traceExtraParams(params);
            }
        };

        this.trace = function trace(arg, ...params) {
            if (enabled.trace) {
                stream.write(colors.gray(format('trace', arg)));
                traceExtraParams(params);
            }
        };

        this.print = function print(arg, ...params) {
            if (enabled.print) {
                stream.write(printFormat(null, arg));
                traceExtraParams(params);
            }
        };
    }
}

export {
    Log,
};
