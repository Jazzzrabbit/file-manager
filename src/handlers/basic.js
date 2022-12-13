import fs from 'fs/promises';
import path from 'path';
import { OP_FAILED } from '../model/env.js';

export const cat = async arg => {
  try {
    const fileOpened = await fs.open(path.resolve(arg));
    const rs = fileOpened.createReadStream();
    rs.pipe(process.stdout);
  } catch {
    console.error(OP_FAILED);
  }
}

export const add = async arg => {
  try {
    const pathToFile = Array.isArray(arg) ? arg[0] : arg;
    await fs.writeFile(path.resolve(pathToFile), '');
  } catch {
    console.error(OP_FAILED);
  }
}

export const rename = async args => {
  const [oldName, newName] = args;
  try {
    await fs.rename(path.resolve(oldName), path.resolve(newName));
  } catch {
    console.error(OP_FAILED);
  }
}