#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../index.js';

const program = new Command();
program
  .version('0.0.1', '-v, --version', 'output the version number')
  .description('Compares two configuration files and show a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .argument('[formatter]')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, formatter = 'stylish') => {
    const result = genDiff(filepath1, filepath2, formatter);
    console.log(result);
  });
program.parse();
