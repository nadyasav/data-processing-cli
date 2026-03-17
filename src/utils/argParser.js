export function parseArgs(args) {
  const parsedArgs = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const hasValue = i + 1 < args.length && !args[i + 1].startsWith('--');

      if (hasValue) {
        parsedArgs[key] = args[i + 1];
        i++;
      } else {
        parsedArgs[key] = true;
      }
    }
  }

  return parsedArgs;
}
