import os, { userInfo } from 'os';
import { ERROR_MSG } from '../model/env.js';

export const getInfo = async args => {
  const arg = args[0].slice(2);
  switch (arg) {
    case ('EOL'): {
      console.log(`Default system End-Of-Line: ${JSON.stringify(os.EOL)}`);
      break;
    }
    case ('cpus'): {
      const cpuInfo = os.cpus().map(({ model, speed }) => ({ model, speed: speed / 1000 + 'GHz' }));
      console.log(`Overall amount of CPUs: ${cpuInfo.length}`);
      console.table(cpuInfo);
      break;
    }
    case ('homedir'): {
      console.log(`Home directory: ${os.homedir()}`);
      break;
    }
    case ('username'): {
      console.log(`Current system user name: ${userInfo({ encoding: 'utf-8' }).username}`);
      break; 
    }
    case ('architecture'): {
      console.log(`CPU architecture: ${os.arch()}`);
      break; 
    }
    default: console.log(ERROR_MSG);
  };
};