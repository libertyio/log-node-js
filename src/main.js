/*!
Copyright (C) 2020 Liberty Infrasystems LLC. All rights reserved.
*/

const colors = require('colors');

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
    error, warn, info, ok, trace: '[c2] <level>'
    print: none

newlines:
    error, warn, info, ok, trace, print: always add a newline

    NOTE: if you need output control of newlines
    then just use process.stdout.write directly.
*/

class Log {
    constructor(options = {}) {
        const {
            tag = null, withLevel = true, enable = {
                error: true, warn: true, info: true, ok: true, trace: true, print: true,
            }, /* color = null, */ stream = process.stderr,
        } = options;

        const formatWithTagLevelText = function formatWithTagLevelText(level, text) {
            return `[${tag}] ${level}: ${text}\n`;
        };
        const formatWithTagText = function formatWithTagText(level, text) {
            return `[${tag}] ${text}\n`;
        };
        const formatWithLevelText = function formatWithLevelText(level, text) {
            return `${level}: ${text}\n`;
        };
        const formatWithText = function formatWithText(level, text) {
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

        this.error = function error(arg) {
            if (enable.error) {
                stream.write(colors.red(format('error', arg)));
            }
        };

        this.warn = function warn(arg) {
            if (enable.warn) {
                stream.write(colors.yellow(format('warn', arg)));
            }
        };

        this.info = function info(arg) {
            if (enable.info) {
                stream.write(colors.blue(format('info', arg)));
            }
        };

        this.ok = function ok(arg) {
            if (enable.ok) {
                stream.write(colors.green(format('ok', arg)));
            }
        };

        this.trace = function trace(arg) {
            if (enable.trace) {
                stream.write(colors.gray(format('trace', arg)));
            }
        };

        this.print = function print(arg) {
            if (enable.print) {
                stream.write(printFormat(null, arg));
            }
        };
    }
}

export {
    Log,
};
