Introduction
============

Write messages to stderr and stdout. Features include:

* configurable color scheme, e.g. use red for error messages
* configurable tag to prefix each message, e.g. `[label] message`
* configurable output filters, e.g. hide `trace` level messages

Example:

```
const { Log } = require('@libertyio/log');
const log = new Log();
log.error('an error message');
log.warn('a warning message');
log.info('an info messsage');
log.ok('a success message');
log.trace('a trace message');
log.print('raw output without a log level');
```
