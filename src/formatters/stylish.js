import _ from 'lodash';

const getSpacesText = (level = 0, hasPrefix = false) => {
  let spaces;
  if (hasPrefix) {
    spaces = level <= 0 ? 2 : level * 4 - 3;
  } else {
    spaces = level <= 0 ? 0 : level * 4;
  }

  return ' '.repeat(spaces);
};

const formatValue = (value, spaces) => {
  let result = [];

  result = [...result, '{'];

  if (!_.isObject(value)) {
    return `${value}`;
  }

  _.sortBy(Object.keys(value)).forEach((key) => {
    if (_.isObject(value[key])) {
      result = [...result,
        `${getSpacesText(spaces)}${key}: ${formatValue(value[key], spaces + 1)}`];
    } else {
      result = [...result,
        `${getSpacesText(spaces)}${key}: ${value[key]}`];
    }
  });

  result = [...result, `${getSpacesText(spaces - 1)}}`];
  return result.join('\n');
};

const format = (data, spaces = 1) => {
  let result = [];
  result = [...result, '{'];

  data.forEach((line) => {
    switch (line.type) {
      case 'deep':
        result = [...result,
          `${getSpacesText(spaces)}${line.key}: ${format(
            line.value,
            spaces + 1,
          )}`];
        break;
      case 'equal':
        result = [...result,
          `${getSpacesText(spaces, true)}   ${line.key}: ${formatValue(
            line.value,
            spaces + 1,
          )}`];
        break;
      case 'added':
        result = [...result,
          `${getSpacesText(spaces, true)} + ${line.key}: ${formatValue(
            line.value,
            spaces + 1,
          )}`];
        break;
      case 'removed':
        result = [...result,
          `${getSpacesText(spaces, true)} - ${line.key}: ${formatValue(
            line.value,
            spaces + 1,
          )}`];
        break;
      case 'changed':
        result = [...result,
          `${getSpacesText(spaces, true)} - ${line.key}: ${formatValue(
            line.value,
            spaces + 1,
          )}`];
        result = [...result,
          `${getSpacesText(spaces, true)} + ${line.key}: ${formatValue(
            line.newValue,
            spaces + 1,
          )}`];
        break;
      default:
        console.log('unknown');
    }
  });
  result = [...result, `${getSpacesText(spaces - 1)}}`];

  return result.join('\n');
};

export default format;
