import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const addPath = (path, newPath) => {
  if (path.length === 0) {
    return newPath;
  }
  return `${path}.${newPath}`;
};

const print = (line, path = '') => {
  let result = [];
  switch (line.type) {
    case 'deep':
      result = [...result, ...line.value.map((innerLine) => print(innerLine, `${addPath(path, line.key)}`))];
      break;
    case 'added':
      result = [...result, `Property '${addPath(path, line.key)}' was added with value: ${formatValue(line.value)}`];
      break;
    case 'removed':
      result = [...result, `Property '${addPath(path, line.key)}' was removed`];
      break;
    case 'changed':
      result = [...result, `Property '${addPath(path, line.key)}' was updated. From ${formatValue(line.value)} to ${formatValue(line.newValue)}`];
      break;
    case 'equal':
      break;
    default:
      throw new Error(`Type: ${line.type} is undefined`);
  }
  return result;
};

const plain = (data) => {
  let result = [];
  data.forEach((line) => {
    result = [...result, (print(line))];
  });
  return result.flat(Infinity).join('\n');
};

export default plain;
