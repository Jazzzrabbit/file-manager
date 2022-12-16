import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';
import { OP_FAILED } from '../model/env.js';

export const hash = async arg => {
  try {
    const file = await fs.readFile(path.resolve(arg[0]));
    const hash = crypto.createHash('sha256').update(file);
    const hex = hash.digest('hex');
    console.log(hex);
  } catch {
    console.error(OP_FAILED);
  };
};