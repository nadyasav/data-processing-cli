import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { printFailedMsg } from "../utils/utils.js";

const SUPPORTED_ALGORITHMS = ['sha256', 'md5', 'sha512'];

export async function calculateHash(currentDir, args) {
  const { input, save } = args;
  const algorithm = typeof args.algorithm === 'string' ? args.algorithm : 'sha256';

  try {
    if (!input || !SUPPORTED_ALGORITHMS.includes(algorithm)) {
      throw new Error();
    }

    const filePathAbs = path.resolve(currentDir, input);
    const fileStats = await fs.promises.stat(filePathAbs);

    if (!fileStats.isFile()) {
      throw new Error();
    }

    const hash = crypto.createHash(algorithm);

    await pipeline(
      fs.createReadStream(filePathAbs),
      hash
    );

    const hashValue = hash.digest('hex');
    console.log(`${algorithm}: ${hashValue}`);

    if(save) {
      const hashFileName = `${filePathAbs}.${algorithm}`;
      await fs.promises.writeFile(hashFileName, hashValue);
    }
  } catch {
    printFailedMsg();
  }
}
