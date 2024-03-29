#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../src/index.js';

const program = new Command();
program
  .version('0.0.1', '-v, --version', 'output the version number')
  .description('Compares two configuration files and show a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2, program.opts().format);
    console.log(result);
  });
program.parse();
