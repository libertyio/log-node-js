import { Log } from '../src/main.js';

describe('log', function () {
    it('prints nicely by default', function () {
        const log = new Log();
        // log to stderr
        log.error('foo');
        log.warn('foo');
        log.ok('foo');
        log.info('foo');
        log.trace('foo');
        log.print('foo'); // except for this one        
    });
    it('prints tag when provided', function () {
        const log = new Log({ tag: 'test' });
        // log to stderr
        log.error('foo');
        log.warn('foo');
        log.ok('foo');
        log.info('foo');
        log.trace('foo');
        log.print('foo'); // including this one        
    });
    it('enables output control', function () {
        const logOnlyTrouble = new Log({ enable: { error: true, warn: true }});
        logOnlyTrouble.error('foo');
        logOnlyTrouble.warn('foo');
        logOnlyTrouble.ok('foo');  // silent
        logOnlyTrouble.info('foo'); // silent
        logOnlyTrouble.trace('foo');  // silent
        logOnlyTrouble.print('foo'); // silent
    });
    it('enables stream control', function () {
        const log = new Log({ tag: 'stdout', stream: process.stdout });
        log.error('foo');
        log.warn('foo');
        log.ok('foo');
        log.info('foo');
        log.trace('foo');
        log.print('foo');
    });
    it('enables trace and above', function () {
        const log = new Log({ tag: 'test', level: 'trace' });
        // log to stderr
        log.error('foo');
        log.warn('foo');
        log.ok('foo');
        log.info('foo');
        log.trace('foo');
        log.print('foo'); // including this one        
    });
    it('enables info and above', function () {
        const log = new Log({ tag: 'test', level: 'info' });
        // log to stderr
        log.error('foo');
        log.warn('foo');
        log.ok('foo');
        log.info('foo');
        log.trace('foo'); // not this one
        log.print('foo'); // including this one        
    });
    it('enables info and above without print', function () {
        const log = new Log({ tag: 'test', level: 'info', enable: { print: false } });
        // log to stderr
        log.error('foo');
        log.warn('foo');
        log.ok('foo');
        log.info('foo');
        log.trace('foo'); // not this one
        log.print('foo'); // not this one        
    });
    it('enables warn and above', function () {
        const log = new Log({ tag: 'test', level: 'warn' });
        // log to stderr
        log.error('foo');
        log.warn('foo');
        log.ok('foo'); // not this one
        log.info('foo'); // not this one
        log.trace('foo'); // not this one
        log.print('foo'); // including this one        
    });
    it('enables error and above', function () {
        const log = new Log({ tag: 'test', level: 'error' });
        // log to stderr
        log.error('foo');
        log.warn('foo'); // not this one
        log.ok('foo'); // not this one
        log.info('foo'); // not this one
        log.trace('foo'); // not this one
        log.print('foo'); // including this one        
    });
    it('prints extra params when trace enabled', function () {
        const log = new Log({ tag: 'test', level: 'trace' });
        // log to stderr
        try {
            throw new Error('foo');
        } catch (err) {
            log.error('failed', err);
            log.warn('failed', err);
            log.ok('failed', err);
            log.info('failed', err);
            log.trace('failed', err);
            log.print('failed', err); // including this one        
        }
    });
    it('does not extra params when trace disabled', function () {
        const log = new Log({ tag: 'test', level: 'info' });
        // log to stderr
        try {
            throw new Error('foo');
        } catch (err) {
            log.error('failed', err); // the error, but not the trace
            log.warn('failed', err); // the error, but not the trace
            log.ok('failed', err); // the error, but not the trace
            log.info('failed', err); // the error, but not the trace
            log.trace('failed', err); // nothing
            log.print('failed', err); // the message, but not the trace
        }
    });
});
