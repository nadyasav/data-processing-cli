import { INVALID_INPUT, COMMANDS } from './constants.js';
import { up, cdHandler, lsHandler } from './navigation.js';
import { printCurrentDir } from './utils/utils.js';

export function startRepl(rl, homeDir, exit) {
  let currentDir = homeDir;

  rl.on('line', async (input) => {
    const [command, ...args] = input.trim().split(' ');
    const [arg1, arg2] = args;

    switch (command) {
      case COMMANDS.EXIT:
        exit();
        break;
      case COMMANDS.UP:
        currentDir = up(currentDir);
        break;
      case COMMANDS.CD:
        if (arg1) {
          currentDir = await cdHandler(currentDir, arg1);
        } else {
          console.log(INVALID_INPUT);
        }
        break;
      case COMMANDS.LS:
        await lsHandler(currentDir);
        break;
      default:
        console.log(INVALID_INPUT);
        break;
    }

    printCurrentDir(currentDir);
    rl.prompt()
  });
}
