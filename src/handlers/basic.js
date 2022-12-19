import fs from 'fs/promises';
import path from 'path';
import { OP_FAILED } from '../model/env.js';
import { createWriteStream } from "fs";
import { pipeline } from 'stream/promises';
import { checkFile } from '../utils/utils.js';

export const cat = async arg => {
  try {
    const isFile = await checkFile(arg[0]);
    if (isFile) {
      const fileOpened = await fs.open(path.resolve(arg[0]));
      const rs = fileOpened.createReadStream();
      rs.pipe(process.stdout);
    } else throw new Error();
  } catch {
    console.error(OP_FAILED);
  };
};

export const add = async arg => {
  try {
    const regex = /\/|\\/g;
    const isPath = regex.test(arg[0]);
    if (!isPath) await fs.writeFile(path.resolve(arg[0]), '');
    else throw new Error();
  } catch {
    console.error(OP_FAILED);
  };
};

export const rename = async args => {
  const [oldName, newName] = args;
  try {
    const regex = /\/|\\/g;
    const isPath = regex.test(newName);
    const isFile = await checkFile(oldName);
    if (isFile && !isPath) await fs.rename(path.resolve(oldName), newName);
    else throw new Error();
  } catch {
    console.error(OP_FAILED);
  };
};

export const copy = async args => {
  const [oldPath, newPath] = args;
  try {
    const isFile = await checkFile(oldPath);
    if (isFile) {
      const openedFile = await fs.open(path.resolve(oldPath));
      const rs = openedFile.createReadStream();
      const basename = path.basename(oldPath);
      const ws = createWriteStream(path.resolve(newPath, basename));
      await pipeline(rs, ws);
      openedFile.close();
    } else throw new Error();
  } catch {
    console.error(OP_FAILED);
  };
};

export const move = async args => {
  try {
    await copy(args).then(async () => await fs.rm(path.resolve(args[0])));
  } catch {
    console.error(OP_FAILED);
  };
};

export const remove = async arg => {
  try {
    const isFile = checkFile(arg[0]);
    if (isFile) await fs.rm(path.resolve(arg[0]));
    else throw new Error();
  } catch {
    console.error(OP_FAILED);
  };
};