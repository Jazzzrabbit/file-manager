import os from 'os';
import fs from 'fs/promises';
import { ERROR_MSG } from '../model/env.js';
import path from 'path';

export const upOneDirectory = () => {
  try {
    process.chdir('..');
  } catch (e) {
    console.log(e);
  }
}

export const changeDirectory = args => {
  try {
    const arg = args.length ? args[0] : os.homedir();
    process.chdir(arg);
  } catch {
    console.log(ERROR_MSG);
  }
}

export const list = async () => {
  try {
    const list = await fs.readdir(path.resolve(process.cwd()), { withFileTypes: true });
    const unsortedList = list
      .map(file => file.isDirectory() ? { value: file.name, type: 'folder' } : { value: file.name, type: 'file' });
    const sortedList = unsortedList
      .sort((a, b) => a.value.toLowerCase() < b.value.toLowerCase() ? 1 : -1)
      .sort((a, b) => a.type < b.type ? 1 : -1);
  
    sortedList.length ? console.table(sortedList) : console.log('This folder is empty.');
  } catch (e) {
    console.log(e);
  }
}