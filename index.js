const { exists, paths, spawn } = require('./shared')
const { promisify } = require('util');

const dumpSymbolSync = function (binaryPath, callback) {
  exists(paths.exeFinal)
  .then(binExists => {
    if (!binExists) {
      throw new Error('Unable to find "dump_syms"');
    }

    return spawn(paths.exeFinal, [binaryPath]);
  })
  .then(b => callback(null, b))
  .catch(e => callback(e, null))
}

module.exports.dumpSymbolSync = dumpSymbolSync;
module.exports.dumpSymbol = promisify(dumpSymbolSync);