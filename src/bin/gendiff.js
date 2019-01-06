#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package.json';
import genDiff from '..';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .action((configBefore, configAfter) => {
    const diff = genDiff(configBefore, configAfter, program.format);
    console.log(diff);
  })
  .option('-f, --format [type]', 'Output format: recursive, plain, json', 'recursive')
  .parse(process.argv);
