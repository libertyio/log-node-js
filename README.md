Introduction
============

Write messages to stderr and stdout. Features include:

* configurable color scheme, e.g. use red for error messages
* configurable tag to prefix each message, e.g. `[label] message`
* configurable output filters, e.g. hide `trace` level messages

Example:

```
import { Log } from '@libertyio/log-node-js';
const log = new Log();
log.error('an error message');
log.warn('a warning message');
log.ok('a success message');
log.info('an info messsage');
log.trace('a trace message');
log.print('raw output without a log level');
```

# Sample code

It's easy to initialize a log object:

```
import { Log } from '@libertyio/log-node-js';
const { LOG_LEVEL = 'info' } = process.env;
const log = new Log({ tag: 'MY_APP', level: LOG_LEVEL });
```

The `LOG_LEVEL` environment variable is just a suggestion.
It can be named anything you want, or you can use a command line
parameter, or pre-configured setting.

# Options

The following options can be passed to the constructor:

**tag** (string)
Prefix every log message with `[tag]`. This can be useful to identify which component
is emitting a log message. Default is `null` which means to not display a tag.

**withLevel** (boolean)
Prefix every log message with `level:`. This can be useful when the output does not
support colors so the log level of each message is evident. In a color terminal,
it might be redundant. Default is `true` which means to show the level.

**level** (string)
Show log messages only for this level and above. The levels are:

* error
* warn
* ok
* info
* trace

The default is 'info' which means to show all messages marked 'info' and above.

**enable** (object)
Override the level setting. You can use this to show or hide 'print' messages,
and also to create customized configurations like showing 'error' and 'trace'
but not the other levels.

An enable object can look like this:

```
{ error: true, warn: true, ok: true, info: true, trace: true, print: true }
```

You only need to specify the log message types you want to override.

The default is an empty object which means no overrides.

**stream** (object)
Print the log messages to the specified stream. The default is `process.stderr`.
You can set this to `process.stdout` if you want log messages to be printed
to stdout instead of stderr.
