const { Log } = require('../dist/main.umd.js');

describe('log', function () {
    it('prints nicely by default', function () {
        const log = new Log();
        // log to stderr
        log.error('foo');
        log.warn('foo');
        log.info('foo');
        log.ok('foo');
        log.trace('foo');
        log.print('foo'); // except for this one        
    });
    it('prints tag when provided', function () {
        const log = new Log({ tag: 'test' });
        // log to stderr
        log.error('foo');
        log.warn('foo');
        log.info('foo');
        log.ok('foo');
        log.trace('foo');
        log.print('foo'); // including this one        
    });
    it('enables output control', function () {
        const logOnlyTrouble = new Log({ enable: { error: true, warn: true }});
        logOnlyTrouble.error('foo');
        logOnlyTrouble.warn('foo');
        logOnlyTrouble.info('foo'); // silent
        logOnlyTrouble.ok('foo');  // silent
        logOnlyTrouble.trace('foo');  // silent
        logOnlyTrouble.print('foo'); // silent
    });
    it('enables stream control', function () {
        const log = new Log({ tag: 'stdout', stream: process.stdout });
        log.error('foo');
        log.warn('foo');
        log.info('foo');
        log.ok('foo');
        log.trace('foo');
        log.print('foo');
    });
});
