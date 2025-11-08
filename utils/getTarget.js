const getTargetArch = () => {
  return process.env.npm_config_arch || process.arch;
}

module.exports.getTargetArch = getTargetArch;

const getRustTarget = (platform = process.platform, arch = getTargetArch()) => {
  let target = '';

  if (platform === 'linux') {
    target += arch === 'arm64' ? 'aarch64-unknown-linux-gnu' : 'x86_64-unknown-linux-gnu';
  } else if (platform === 'darwin') {
    target += arch === 'arm64' ? 'aarch64-apple-darwin' : 'x86_64-apple-darwin';
  } else if (platform === 'win32') {
    target += arch === 'arm64' ? 'aarch64-pc-windows-msvc' : 'x86_64-pc-windows-msvc';
  } else {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  return target;
};

module.exports.getRustTarget = getRustTarget;

if (require.main === module) {
  const target = getRustTarget();
  console.log(target);
}
