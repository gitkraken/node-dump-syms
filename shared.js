const path = require('path');
const { promises: fs } = require('fs');
const { spawn: spawnSync } = require('child_process');

const { getTargetArch } = require('./utils/getTarget');

const spawn = (...args) => new Promise((resolve, reject) => {
  let stdout = Buffer.alloc(0);
  let stderr = Buffer.alloc(0);
  const child = spawnSync(...args);
  child.stdout.on('data', (b) => stdout = Buffer.concat([stdout, b]));
  child.stderr.on('data', (b) => stderr = Buffer.concat([stderr, b]));
  child.on('close', function (code) {
    if (code !== 0) {
      reject(stderr ? new Error(stderr.toString()) : new Error(`Command ${command} failed ${code}`));
    } else {
      resolve(stdout);
    }
  });
  child.on('error', function (error) {
    reject(error);
  })
});

module.exports.spawn = spawn;

const exists = async (filePath) => fs.access(filePath).then(() => true).catch(e => e.code !== 'ENOENT');

module.exports.exists = exists;

const exe = process.platform === 'win32' ? '.exe' : '';
const getPaths = (arch) => ({
  submodule: path.join(__dirname, 'deps', 'dump_syms'),
  bin: path.join(__dirname, 'bin', `${process.platform}-${arch}`),
  build: path.join(__dirname, 'build'),
  exeOut: path.join(__dirname, 'build', 'release', `dump_syms${exe}`),
  exeFinal: path.join(__dirname, 'bin', `${process.platform}-${arch}`, `dump_syms${exe}`),
});

module.exports.runtimePaths = getPaths(process.arch);
module.exports.buildPaths = getPaths(getTargetArch());
