import _ from 'lodash';

const diff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const result = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], type: 'added' };
    } if (!_.has(obj2, key)) {
      return { key, value: obj1[key], type: 'removed' };
    } if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, value: diff(obj1[key], obj2[key]), type: 'deep' };
    } if (obj1[key] === obj2[key]) {
      return { key, value: obj1[key], type: 'equal' };
    }
    return {
      key,
      value: obj1[key],
      type: 'changed',
      newValue: obj2[key],
    };
  });

  return result;
};

export default diff;
