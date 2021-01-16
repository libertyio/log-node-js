Introduction
============

Write messages to stderr and stdout. Features include:

* configurable color scheme, e.g. use red for error messages
* configurable tag to prefix each message, e.g. `[label] message`
* configurable output filters, e.g. hide `trace` level messages

Example:

```
const { Log } = require('@libertyio/log-node-js');
const log = new Log();
log.error('an error message');
log.warn('a warning message');
log.info('an info messsage');
log.ok('a success message');
log.trace('a trace message');
log.print('raw output without a log level');
```

# Application wrapper

If you're writing a NodeJS application and you need to use the log module from
many components, you probably don't want to repeat the same code in each module
to configure the log.

Here is a NodeJS example of writing a wrapper module that you can use throughout
your application:

```
const { Log } = require('@libertyio/log-node-js');

const { LOG_LEVEL } = process.env;

let level = LOG_LEVEL || 'info';
let stream = process.stderr;
let log;

switch (level) {
    case 'error':
        log = new Log({ tag: 'MY_APP', enable: { error: true, warn: false, info: false, ok: false, trace: false, print: true }});
        break;
    case 'warn':
        log = new Log({ tag: 'MY_APP', enable: { error: true, warn: true, info: false, ok: false, trace: false, print: true }});
        break;
    case 'info':
        log = new Log({ tag: 'MY_APP', enable: { error: true, warn: true, info: true, ok: true, trace: false, print: true }});
        break;
    case 'trace':
        log = new Log({ tag: 'MY_APP', enable: { error: true, warn: true, info: true, ok: true, trace: true, print: true }, stream });
        break;
    default:
        // if enviornment contains invalid log level, default to info and display a warning
        log = new Log({ tag: 'MY_APP', enable: { error: true, warn: true, info: true, ok: true, trace: false, print: true }});
        log.warn(`invalid log level selected: ${level}`);
        break;        
}

export {
    log,
};
```

Then in your application you just do this:

```
const { log } = require('your_wrapper');
log.info('an info messsage');
```

So you can change the log level everywhere by setting the environment variable
`LOG_LEVEL` before you start the application.
