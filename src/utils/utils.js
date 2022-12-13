export const getUsername = () => {
  const args = process.argv.slice(2);
  const userCommand = '--username=';
  const username = args.filter(item => item.startsWith(userCommand))[0];
  return username ?  username.replace(userCommand, '') : 'Anonymous';
}

export const welcomeMessage = username => {
  console.log(`Welcome to the File Manager, ${username}!`);
}

export const getHomeDir = homeDir => {
  console.log(`You are currently in ${homeDir}`);
}

export const getDir = () => {
  console.log(`You are currently in ${process.cwd()}`);
}

export const exitApp = username => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}

export const lineParser = line => {
  let [command, ...args] = line.trim().split(' ');
  const regex = /"|'/g;

  if (regex.test(args)) args = args.join(' ').replace(regex, '');

  const isNoArgsCommand = ['up', 'cd', 'ls', '.exit'].some(item => item === command) && !args.length || typeof args === 'string';
  const isOneArgCommand = ['cd', 'cat', 'add', 'rm', 'os', 'hash'].some(item => item === command) && args.length === 1;
  const isTwoArgsCommand = ['rn', 'cp', 'mv', 'compress', 'decompress'].some(item => item === command) && args.length === 2;
  
  return isOneArgCommand || isTwoArgsCommand || isNoArgsCommand ? [command, args] : null;
}

export const init = (username, userHomeDir) => {
  welcomeMessage(username);
  process.chdir(userHomeDir);
  getHomeDir(userHomeDir);
}