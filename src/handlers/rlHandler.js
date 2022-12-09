import { ERROR_MSG } from "../model/env.js";
import { exitApp, getDir, lineParser } from "../utils/utils.js";
import { changeDirectory, list, upOneDirectory } from "./navigation.js";

export const rlHandler = line => {
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
      }
    } catch {
      console.log(ERROR_MSG);
    } finally {
      resolve();
      getDir();
    };
  });
};