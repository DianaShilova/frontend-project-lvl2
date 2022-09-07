import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import getParser from './parsers.js';

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

const formatObject = (obj, spaces) => {
  const result = [];
  const spacesText = ' '.repeat(spaces * 2);

  _.sortBy(Object.keys(obj)).forEach((key) => {
    result.push(`${spacesText}${key}: ${obj[key]}`);
  });
  return result.join('\n');
};

const comareObjects = (obj1, obj2, spaces = 1) => {
  const spacesText = ' '.repeat(spaces * 2);
  const result = []; // создаем массив для данных
  const arrOfKey = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  // создаем отсортированное объединение ключей 2ух объектов

  for (let i = 0; i < arrOfKey.length; i += 1) {
    const key = arrOfKey[i]; // обход ключей

    if (_.has(obj1, key) && _.has(obj2, key)) { // если ключ есть и в объекте1 и в объекте2
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) { // и оба ключа объекты
        result.push(`${spacesText}${key}: {`);
        result.push(comareObjects(obj1[key], obj2[key], spaces + 1));
        result.push(`${spacesText}}`);
      } else if (obj1[key] === obj2[key]) { // и значения равны
        result.push(`${spacesText}  ${key}: ${obj1[key]}`);
      } else { // ключи есть в объектах, но значения не равны
        result.push(`${spacesText}- ${key}: ${obj1[key]}`);
        result.push(`${spacesText}+ ${key}: ${obj2[key]}`);
      }
    } else if (_.has(obj1, key)) { // но есть в объекте1
      if (_.isObject(obj1[key])) { // и вэлью является объектом
        result.push(`${spacesText}${key}`);
        result.push(formatObject(obj1[key], spaces * 2));
      } else {
        result.push(`${spacesText}- ${key}: ${obj1[key]}`);
      }
    } else if (_.isObject(obj2[key])) { // вэлью объекта 2 является объектом
      result.push(`${spacesText}+ ${key}: {`);
      result.push(formatObject(obj2[key], spaces * 2));
      result.push(`${spacesText}}`);
    } else {
      result.push(`${spacesText}+ ${key}: ${obj2[key]}`); // но есть в объекте2
    }
  }

  return result.join('\n'); // вернуть каждый ключ-значение с новой строки
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = getObjFromFile(filepath1); // достаем данные из файла в виде объекта
  const obj2 = getObjFromFile(filepath2); // достаем данные из файла в виде объекта

  const result = comareObjects(obj1, obj2); // результат функции сравнивающий 2 объекта
  return `{\n${result}\n}`;
};

export default genDiff;
