import { ERROR_MSG } from "../model/env.js";
import { exitApp, getDir, lineParser } from "../utils/utils.js";
import { add, cat, copy, move, remove, rename } from "./basic.js";
import { hash } from "./hash.js";
import { getInfo } from "./info.js";
import { changeDirectory, list, upOneDirectory } from "./navigation.js";
import { brotliZip } from "./zip.js";

export const rlHandler = (line, username) => {
  return new Promise(async resolve => {
    try {
      const [command, args] = lineParser(line);

      switch (command) {
        case ('.exit'): {
          exitApp(username);
          break;
        }
        case ('up'): {
          upOneDirectory();
          break;
        }
        case ('cd'): {
          changeDirectory(args);
          break;
        }
        case ('ls'): {
          await list();
          break;
        }
        case ('cat'): {
          await cat(args);
          break;
        }
        case ('add'): {
          await add(args);
          break;
        }
        case ('rn'): {
          await rename(args);
          break;
        }
        case ('cp'): {
          await copy(args);
          break;
        }
        case ('mv'): {
          await move(args);
          break;
        }
        case ('rm'): {
          await remove(args);
          break;
        }
        case ('os'): {
          await getInfo(args);
          break;
        }
        case ('hash'): {
          await hash(args);
          break;
        }
        case ('compress'): {
          await brotliZip(args, 'zip');
          break;
        }
        case ('decompress'): {
          await brotliZip(args, 'unzip');
          break;
        }
      }
    } catch {
      console.error(ERROR_MSG);
    } finally {
      resolve();
      getDir();
    };
  });
};