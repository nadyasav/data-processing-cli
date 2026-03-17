import { OPERATION_FAILED } from '../constants.js';

export function printCurrentDir(currentDir) {
  console.log(`You are currently in ${currentDir}`);
}

export function printFailedMsg() {
  console.log(OPERATION_FAILED);
}
