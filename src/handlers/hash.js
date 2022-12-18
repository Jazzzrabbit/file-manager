import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';
import { OP_FAILED } from '../model/env.js';
import { checkFile } from '../utils/utils.js';

export const hash = async arg => {
  try {
    const isFile = checkFile(arg);
    if (isFile) {
      const file = await fs.readFile(path.resolve(arg[0]));
      const hash = crypto.createHash('sha256').update(file);
      const hex = hash.digest('hex');
      console.log(hex);
    } else throw new Error();
  } catch {
    console.error(OP_FAILED);
  };
};