import { createReadStream, createWriteStream } from 'fs';
import Zlib from 'zlib';
import { pipeline } from 'stream/promises';
import path from 'path';
import { OP_FAILED } from '../model/env.js';
import { checkFile } from '../utils/utils.js';

export const brotliZip = async (args, flag = 'zip') => {
  try {
    const [pathToFile, pathToCompressedFile] = args.length > 1 ? args : [args[0], '.'];
    const regex = /\.br$/;
    const isFile = await checkFile(pathToFile);
    if (isFile) {
      const basename = flag === 'zip' ? `${path.basename(pathToFile)}.br` : path.basename(pathToFile).replace(regex, '');
      const rs = createReadStream(path.resolve(pathToFile));
      const ws = pathToCompressedFile === '.' ? createWriteStream(path.resolve(pathToCompressedFile, basename)) :
        createWriteStream(path.resolve(pathToCompressedFile));
      const brotli = flag === 'zip' ? Zlib.createBrotliCompress({
        params: {
          [Zlib.constants.BROTLI_PARAM_QUALITY]: Zlib.constants.BROTLI_MIN_QUALITY,
        },
      }) : Zlib.createBrotliDecompress();
      await pipeline(rs, brotli, ws);
    } else throw new Error();
  } catch {
    console.error(OP_FAILED);
  };
};