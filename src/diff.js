import _ from 'lodash';

const diff = (obj1, obj2) => {
  const result = [];
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]; // обход ключей
    if (_.has(obj1, key) && _.has(obj2, key)) { // ключи есть в обоих объектах
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) { // оба ключа объекты
        result.push({ type: '*', key, value: diff(obj1[key], obj2[key]) });
      } else if (obj1[key] === obj2[key]) { // значения равны
        result.push({ type: '=', key, value: obj1[key] });
      } else { // значения не равны
        result.push({ type: '-', key, value: obj1[key] });
        result.push({ type: '+', key, value: obj2[key] });
      }
    } else if (_.has(obj1, key)) { // есть в 1 объект
      if (_.isObject(obj1[key])) {
        result.push({ type: '*', key, value: diff(obj1[key], {}) });
      } else {
        result.push({ type: '-', key, value: obj1[key] });
      }
    } else if (_.isObject(obj2[key])) {
      result.push({ type: '*', key, value: diff(obj2[key], {}) });
    } else {
      result.push({ type: '+', key, value: obj2[key] });
    }
  }
  return result;
};

export default diff;
