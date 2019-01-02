#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package.json';
import fs from 'fs';
import genDiff from '..';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .action((before, after) => {
    const beforeData = JSON.parse(fs.readFileSync(before, 'utf8'));
    const afterData = JSON.parse(fs.readFileSync(after, 'utf8'));

    return genDiff(beforeData, afterData);
  })
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
