#!/usr/bin/env node
import { Command } from '../../node_modules/commander/esm.mjs';

const program = new Command();
program
  .version('0.0.1', '-v, --version' , 'output the version number')
  .description('Compares two configuration files and show a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
program.parse();