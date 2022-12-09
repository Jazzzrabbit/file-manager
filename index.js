import { getUsername, init, exitApp } from "./src/utils/utils.js";
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import os from 'os';
import { rlHandler } from "./src/handlers/rlHandler.js";

const rl = readline.createInterface({ input, output });
const username = getUsername();
const userHomeDir = os.homedir();

init(username, userHomeDir);

rl.on('line', line => {
  rlHandler(line);
});

rl.on('SIGINT', () => exitApp(username));

