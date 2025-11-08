const { exists, runtimePaths, spawn } = require('./shared')
const { promisify } = require('util');

const dumpSymbolSync = function (binaryPath, callback) {
  exists(runtimePaths.exeFinal)
  .then(binExists => {
    if (!binExists) {
      throw new Error('Unable to find "dump_syms"');
    }

    return spawn(runtimePaths.exeFinal, [binaryPath]);
  })
  .then(b => callback(null, b))
  .catch(e => callback(e, null))
}

module.exports.dumpSymbolSync = dumpSymbolSync;
module.exports.dumpSymbol = promisify(dumpSymbolSync);