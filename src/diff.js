import _ from 'lodash';

const diff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  let result = [];

  keys.forEach((key) => {
    if (!_.has(obj1, key)) {
      result = [...result, { key, value: obj2[key], type: 'added' }];
    } else if (!_.has(obj2, key)) {
      result = [...result, { key, value: obj1[key], type: 'removed' }];
    } else if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      result = [...result, { key, value: diff(obj1[key], obj2[key]), type: 'deep' }];
    } else if (obj1[key] === obj2[key]) {
      result = [...result, { key, value: obj1[key], type: 'equal' }];
    } else {
      result = [...result, {
        key,
        value: obj1[key],
        type: 'changed',
        newValue: obj2[key],
      }];
    }
  });

  return result;
};

export default diff;
