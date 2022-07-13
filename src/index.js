import path from 'path';
import fs from 'fs';
import _ from 'lodash';


const genDiff = (filepath1, filepath2) => {

    const obj1 = getObjFromFile(filepath1); //достаем данные из файла в виде объекта
    const obj2 = getObjFromFile(filepath2); //достаем данные из файла в виде объекта

    const result = comareObjects(obj1, obj2); //результат функции сравнивающий 2 объекта
    return result; 
   
}

const getObjFromFile = (filepath) => {
    const cwd = process.cwd();
    const absoluteFilepath = path.resolve(cwd, filepath); //абсолютный путь до filepatch1

    const dataOfFilepath = fs.readFileSync(absoluteFilepath, 'utf-8'); //вытаскиваем данные из filepath1

    const objOfFilepath = JSON.parse(dataOfFilepath); //данные из filepath1 в виде объекта

    return objOfFilepath;
}

const comareObjects = (obj1, obj2) => {

    const result = []; //создаем массив для данных
    const arrOfKey = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2))) //создаем отсортированное объединение ключей 2ух объектов


    for (const key of arrOfKey) { //обход ключей
        if (_.has(obj1, key) && _.has(obj2, key)) { //если ключ есть и в объекте1 и в объекте2
            if (obj1[key] === obj2[key]) { //и значения равны
              result.push(`  ${key}: ${obj1[key]}`);
            } else { //ключи есть в объектах, но значения не равны
                result.push(`- ${key}: ${obj1[key]}`);
                result.push(`+ ${key}: ${obj2[key]}`);
            }
        } else { //ключи не присутсвуют в обоих объектах
            if (_.has(obj1, key)) { //но есть в объекте1
                result.push(`- ${key}: ${obj1[key]}`)
            } else { result.push(`+ ${key}: ${obj2[key]}`)} //но есть в объекте2
        }
    }

    return result.join('\n'); //вернуть каждый ключ-значение с новой строки
}

export default genDiff;