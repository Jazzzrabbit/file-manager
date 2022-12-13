import os from 'os';
import fs from 'fs/promises';
import path from 'path';

export const upOneDirectory = () => {
  process.chdir('..');
}

export const changeDirectory = args => {
  const arg = typeof args === 'string' ? args : args.length ? args[0] : os.homedir();
  process.chdir(path.resolve(arg));
}

export const list = async () => {
  const list = await fs.readdir(path.resolve(process.cwd()), { withFileTypes: true });
  const unsortedList = list
    .map(file => file.isDirectory() ? { value: file.name, type: 'folder' } : { value: file.name, type: 'file' });
  const sortedList = unsortedList
    .sort((a, b) => a.value.toLowerCase() < b.value.toLowerCase() ? 1 : -1)
    .sort((a, b) => a.type < b.type ? 1 : -1);

  sortedList.length ? console.table(sortedList) : console.log('This folder is empty.');
}