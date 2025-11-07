# @axosoft/dump-syms

A thin node-js wrapper around [Mozilla/dump_syms](https://github.com/mozilla/dump_syms)

### Build

`pnpm install`

### Usage

```
const { dumpSymbol } = require('@axosoft/dump-syms');

const symbols = dumpSymbol('/path/to/binary');
```
