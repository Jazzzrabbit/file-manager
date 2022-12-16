import fs from 'fs/promises';
import path from 'path';
import { OP_FAILED } from '../model/env.js';
import { createWriteStream } from "fs";
import { pipeline } from 'stream/promises';

export const cat = async arg => {
  try {
    const fileOpened = await fs.open(path.resolve(arg[0]));
    const rs = fileOpened.createReadStream();
    rs.pipe(process.stdout);
  } catch {
    console.error(OP_FAILED);
  };
};

export const add = async arg => {
  try {
    const pathToFile = Array.isArray(arg) ? arg[0] : arg;
    await fs.writeFile(path.resolve(pathToFile), '');
  } catch {
    console.error(OP_FAILED);
  };
};

export const rename = async args => {
  const [oldName, newName] = args;
  try {
    await fs.rename(path.resolve(oldName), path.resolve(newName));
  } catch {
    console.error(OP_FAILED);
  };
};

export const copy = async args => {
  const [oldPath, newPath] = args;
  try {
    const openedFile = await fs.open(path.resolve(oldPath));
    const rs = openedFile.createReadStream();
    const basename = path.basename(oldPath);
    const ws = createWriteStream(path.resolve(newPath, basename));
    await pipeline(rs, ws);
    openedFile.close();
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
    await fs.rm(path.resolve(arg[0]));
  } catch {
    console.error(OP_FAILED);
  };
};