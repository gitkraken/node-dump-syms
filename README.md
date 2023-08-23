# @axosoft/dump-syms

A thin node-js wrapper around [Mozilla/dump-syms](https://github.com/mozilla/dump-syms)

### Build

`yarn install`

### Usage

```
const { dumpSymbol } = require('@axosoft/dump-syms');

const symbols = dumpSymbol('/path/to/binary');
```