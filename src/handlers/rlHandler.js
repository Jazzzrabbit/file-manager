import { ERROR_MSG } from "../model/env.js";
import { exitApp, getDir, lineParser } from "../utils/utils.js";
import { add, cat, copy, rename } from "./basic.js";
import { changeDirectory, list, upOneDirectory } from "./navigation.js";

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
      }
    } catch {
      console.error(ERROR_MSG);
    } finally {
      resolve();
      getDir();
    };
  });
};