import { createReadStream, createWriteStream } from 'fs';
import Zlib from 'zlib';
import { pipeline } from 'stream/promises';
import path from 'path';
import { OP_FAILED } from '../model/env.js';

export const brotliZip = async (args, flag = 'zip') => {
  try {
    const [pathToFile, pathToCompressedFile] = args.length > 1 ? args : [args[0], '.'];
    const regex = /\.br$/;
    const basename = flag === 'zip' ? `${path.basename(pathToFile)}.br` : path.basename(pathToFile).replace(regex, '');
    const rs = createReadStream(path.resolve(pathToFile));
    const ws = createWriteStream(path.resolve(pathToCompressedFile, basename));
    const brotli = flag === 'zip' ? Zlib.createBrotliCompress() : Zlib.createBrotliDecompress();
    await pipeline(rs, brotli, ws);
  } catch {
    console.error(OP_FAILED);
  };
};