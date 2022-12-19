import fs from 'fs/promises';
import path from 'path';

export const getUsername = () => {
  const args = process.argv.slice(2);
  const userCommand = '--username=';
  
  if (!args[0].match(userCommand)) return;

  const username = args[0].trim().replace(userCommand, '');
  
  return username || 'Anonymous';
};

export const welcomeMessage = username => {
  console.log(`Welcome to the File Manager, ${username}! \n\nType help to see the list of available commands.\n`);
};

export const getHomeDir = homeDir => {
  console.log(`You are currently in ${homeDir}`);
};

export const getDir = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

export const exitApp = username => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
};

export const lineParser = line => {
  let [command, ...args] = line.trim().split(' ');
  const regex = /"|'/g;
  const splitRegex = /['\"] | ["']/g;

  if (regex.test(args)) args = args.join(' ').split(splitRegex).map(item => item.replace(regex, ''));

  const isNoArgsCommand = ['up', 'cd', 'ls', '.exit', 'help'].some(item => item === command) && !args.length;
  const isOneArgCommand = ['cd', 'cat', 'add', 'rm', 'os', 'hash'].some(item => item === command) && args.length === 1;
  const isTwoArgsCommand = ['rn', 'cp', 'mv'].some(item => item === command) && args.length === 2;
  const isZip = ['compress', 'decompress'].some(item => item === command) && 3 > args.length > 0;

  return isOneArgCommand || isTwoArgsCommand || isNoArgsCommand || isZip ? [command, args] : null;
};

export const checkFile = async fileName => (await fs.lstat(path.resolve(fileName))).isFile();

export const init = (username, userHomeDir) => {
  if (!username) {
    console.log('Please, enter your name in following format: -- --username=your_username');
    process.exit();
  } else {
    welcomeMessage(username);
    process.chdir(userHomeDir);
    getHomeDir(userHomeDir);
  };
};