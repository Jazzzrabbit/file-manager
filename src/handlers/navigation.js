import os from 'os';
import { ERROR_MSG } from '../model/env.js';

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