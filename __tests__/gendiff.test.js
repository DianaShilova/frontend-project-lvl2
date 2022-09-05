import { test, expect } from '@jest/globals';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff comare two JSON file', () => {
  const actual1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = readFile('result.txt');

  expect(actual1).toEqual(expected);
});

test('gendiff comare two YAML file', () => {
  const actual2 = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  const expected = readFile('result.txt');

  expect(actual2).toEqual(expected);
});

test('gendiff comare two YML file', () => {
  const actual3 = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  const expected = readFile('result.txt');

  expect(actual3).toEqual(expected);
});
