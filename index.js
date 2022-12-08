import { getUsername, init, getDir, exitApp } from "./src/utils/utils.js";
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import os from 'os';
import { upOneDirectory } from "./src/handlers/navigation.js";

const rl = readline.createInterface({ input, output });
const username = getUsername();
const userHomeDir = os.homedir();
const userOs = process.platform;

init(username, userHomeDir);

rl.on('line', line => {
  switch (line.trim()) {
    case ('.exit'): {
      exitApp(username);
      break;
    }
    case ('up'): {
      upOneDirectory(userOs);
      break;
    }
    case ('cd ..'): {
      upOneDirectory(userOs);
      break;
    }
  }

  getDir();
})

rl.on('SIGINT', () => exitApp(username));

