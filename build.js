const { stat } = require('fs/promises');
const path = require('path');
const { promises: fs, constants } = require('fs');
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);

const { spawn, paths, exists } = require('./shared');

(async () => {
  if (await exists(paths.exeFinal)) {
    return;
  }

  if (!(await exists(paths.bin))) {
    await fs.mkdir(paths.bin, { recursive: true });
  }

  await spawn('cargo', [
    'build',
    `--manifest-path=${path.join(paths.submodule, 'Cargo.toml')}`,
    `--target-dir=${paths.build}`,
    '--release'
  ]);
  await fs.copyFile(
    paths.exeOut,
    paths.exeFinal
  );
})();