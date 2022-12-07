import { getUsername, init, getDir } from "./src/utils/utils.js";
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import os from 'os';
import { exitApp } from "./src/handlers/handlers.js";

const rl = readline.createInterface({ input, output });
const username = getUsername();
const userHomeDir = os.homedir();

init(username, userHomeDir);

rl.on('line', line => {
  switch (line.trim()) {
    case ('.exit'): {
      exitApp(username);
      break;
    }
  }

  getDir();
})

rl.on('SIGINT', () => exitApp(username));

