import { test, expect } from '@jest/globals';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff comare two file', () => {
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = readFile('result.txt');

  expect(actual).toEqual(expected);
});