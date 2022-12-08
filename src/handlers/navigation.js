import os from 'os';
import fs from 'fs/promises';
import { ERROR_MSG } from '../model/env.js';
import path from 'path';

export const upOneDirectory = () => {
  try {
    process.chdir('..');
  } catch {
    return null;
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
    const list = await fs.readdir(path.resolve(process.cwd()));
    console.table(list);
  } catch {
    return null;
  }
}