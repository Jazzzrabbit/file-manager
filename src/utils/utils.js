export const getUsername = () => {
  const args = process.argv.slice(2);
  const userCommand = '--username=';
  const username = args.filter(item => item.startsWith(userCommand))[0];
  return username ?  username.replace(userCommand, '') : 'Anonymous';
}

export const welcomeMessage = username => {
  console.log(`Welcome to the File Manager, ${username}!`);
}

export const exit = username => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}

export const getHomeDir = (homeDir) => {
  console.log(`You are currently in ${homeDir}`);
}

export const getDir = () => {
  console.log(`You are currently in ${process.cwd()}`);
}

export const init = (username, userHomeDir) => {
  welcomeMessage(username);
  process.chdir(userHomeDir);
  getHomeDir(userHomeDir);
}