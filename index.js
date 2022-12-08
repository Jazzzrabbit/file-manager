import { getUsername, init, getDir, exitApp, lineParser } from "./src/utils/utils.js";
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import os from 'os';
import { changeDirectory, list, upOneDirectory } from "./src/handlers/navigation.js";
import { ERROR_MSG } from "./src/model/env.js";

const rl = readline.createInterface({ input, output });
const username = getUsername();
const userHomeDir = os.homedir();

init(username, userHomeDir);

rl.on('line', line => {
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
        list();
        break;
      }
    }
  } catch {
    console.log(ERROR_MSG);
  }

  getDir();
})

rl.on('SIGINT', () => exitApp(username));

