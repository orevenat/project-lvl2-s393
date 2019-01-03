#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package.json';
import fs from 'fs';
import genDiff from '..';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .action((configBefore, configAfter) => {
    const configBeforeData = JSON.parse(fs.readFileSync(configBefore, 'utf8'));
    const configAfterData = JSON.parse(fs.readFileSync(configAfter, 'utf8'));

    const diff = genDiff(configBeforeData, configAfterData);
    console.log(diff);
  })
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
