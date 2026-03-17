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

async function getDirItemInfo(name, currentDir) {
  const stats = await fs.promises.stat(path.join(currentDir, name));
  const itemInfo = {
    name,
    type: stats.isDirectory() ? 'folder' : 'file'
  };

  return itemInfo;
}

export async function lsHandler(currentDir) {
  try {
    const names = await fs.promises.readdir(currentDir);
    const folders = [];
    const files = [];

    for (const name of names) {
      try {
        const itemInfo = await getDirItemInfo(name, currentDir);

        if(itemInfo.type === "folder") {
          folders.push(itemInfo);
        } else {
          files.push(itemInfo);
        }
      } catch {}
    }

    const sortedFolders = folders.sort((a, b) => a.name.localeCompare(b.name));
    const sortedFiles = files.sort((a, b) => a.name.localeCompare(b.name));
    const dirItems = [...sortedFolders, ...sortedFiles];

    const nameLengthArr = dirItems.map(item => item.name.length);
    const maxNameLength = Math.max(...nameLengthArr);

    for (const item of dirItems) {
      console.log(`${item.name.padEnd(maxNameLength)} [${item.type}]`);
    }
  } catch {
    printFailedMsg();
  }
}
