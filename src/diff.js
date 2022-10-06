import _ from 'lodash';

const diff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const result = [];

  keys.forEach((key) => {
    if (!_.has(obj1, key)) {
      result.push({ key, value: obj2[key], type: '+' });
    } else if (!_.has(obj2, key)) {
      result.push({ key, value: obj1[key], type: '-' });
    } else if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      result.push({ key, value: diff(obj1[key], obj2[key]), type: '*' });
    } else if (obj1[key] === obj2[key]) {
      result.push({ key, value: obj1[key], type: '=' });
    } else {
      result.push({ key, value: obj1[key], type: '-' });
      result.push({ key, value: obj2[key], type: '+' });
    }
  });

  return result;
};

export default diff;
