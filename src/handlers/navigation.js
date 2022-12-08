export const exitApp = username => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}

export const upOneDirectory = userOs => {
  const currentDir = process.cwd();
  const separatorIndex = userOs === 'win32' ? currentDir.lastIndexOf('\\') : currentDir.lastIndexOf('/');
  const nextDir = currentDir.slice(0, separatorIndex);

  try {
    process.chdir(nextDir);
  } catch {
    return null;
  }
}