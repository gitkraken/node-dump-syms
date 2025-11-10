const { stat } = require('fs/promises');
const path = require('path');
const { promises: fs, constants } = require('fs');
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);

const { getRustTarget } = require('./utils/getTarget');
const { spawn, buildPaths, exists } = require('./shared');

(async () => {
  if (await exists(buildPaths.exeFinal)) {
    return;
  }

  if (!(await exists(buildPaths.bin))) {
    await fs.mkdir(buildPaths.bin, { recursive: true });
  }

  const customLinkerFlags = process.env.CC
    ? ['--config', `target.${getRustTarget()}.linker="${process.env.CC}"`]
    : [];

  await spawn('cargo', [
    'build',
    `--target=${getRustTarget()}`,
    ...customLinkerFlags,
    `--manifest-path=${path.join(buildPaths.submodule, 'Cargo.toml')}`,
    `--target-dir=${buildPaths.build}`,
    '--release'
  ], {
    env: process.env,
  });

  await fs.copyFile(
    buildPaths.exeOut,
    buildPaths.exeFinal
  );
})();