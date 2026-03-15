import path from 'node:path';
import fs from 'node:fs';
import { printFailedMsg } from './utils/utils.js';

export function up(currentDir) {
  const rootDir = path.parse(currentDir).root;

  if (currentDir !== rootDir) {
    return path.dirname(currentDir);
  }

  return currentDir;
}

export async function cdHandler(currentDir, targetPath) {
  try {
    const pathAbs = path.resolve(currentDir, targetPath);
    const pathStats = await fs.promises.stat(pathAbs);

    if (!pathStats.isDirectory()) {
      throw new Error();
    }

    return pathAbs;
  } catch {
    printFailedMsg();
    return currentDir;
  }
}
