import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import getParser from './parsers.js';
import diff from './diff.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

const getObjFromFile = (filepath) => {
  const cwd = process.cwd();
  const absoluteFilepath = path.resolve(cwd, filepath); // абсолютный путь до filepatch1

  const parts = filepath.split('/');
  const filename = _.last(parts); // вытаскиваем последний эл массива(имя файла)
  const format = _.last(filename.split('.')); // вытаскиваем расширенеи (.js)

  const dataOfFilepath = fs.readFileSync(absoluteFilepath, 'utf-8'); // вытаскиваем данные из filepath1

  const objOfFilepath = getParser(dataOfFilepath, format); // данные из filepath1 в виде объекта

  return objOfFilepath;
};

const genDiff = (filepath1, filepath2, formatter) => {
  const obj1 = getObjFromFile(filepath1); // достаем данные из файла в виде объекта
  const obj2 = getObjFromFile(filepath2); // достаем данные из файла в виде объекта
  const result = diff(obj1, obj2); // результат функции сравнивающий 2 объекта

  switch (formatter) {
    case 'stylish':
      return stylish(result);

    case 'plain':
      return plain(result);
    default:
      throw new Error('No such formatter');
  }
};

export default genDiff;
