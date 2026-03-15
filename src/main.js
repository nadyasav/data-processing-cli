import readline from 'node:readline/promises';
import { printCurrentDir } from './utils/utils.js';
import os from 'node:os';
import { startRepl } from './repl.js';

function start() {
  const homeDir = os.homedir();
  const startMsg = `Welcome to Data Processing CLI!`;
  const exitMsg = `Thank you for using Data Processing CLI!`;

  console.log(startMsg);
  printCurrentDir(homeDir);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.setPrompt('> ');
  rl.prompt();

  startRepl(rl, homeDir, exit);

  rl.on('SIGINT', () => {
    exit();
  });

  function exit() {
    console.log(exitMsg);
    rl.close();
    process.exit(0);
  }
}

start();
