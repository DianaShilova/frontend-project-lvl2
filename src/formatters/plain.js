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
  switch (line.type) {
    case 'deep':
      return line.value.map((innerLine) => print(innerLine, `${addPath(path, line.key)}`));
    case 'added':
      return `Property '${addPath(path, line.key)}' was added with value: ${formatValue(line.value)}`;
    case 'removed':
      return `Property '${addPath(path, line.key)}' was removed`;
    case 'changed':
      return `Property '${addPath(path, line.key)}' was updated. From ${formatValue(line.value)} to ${formatValue(line.newValue)}`;
    case 'equal':
      return [];
    default:
      throw new Error(`Type: ${line.type} is undefined`);
  }
};

const plain = (data) => {
  const result = data.map((line) => (print(line)));
  return result.flat(Infinity).join('\n');
};

export default plain;
