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