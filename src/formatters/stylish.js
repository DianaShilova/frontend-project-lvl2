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
  const result = [];

  result.push('{');

  if (!_.isObject(value)) {
    return `${value}`;
  }

  _.sortBy(Object.keys(value)).forEach((key) => {
    if (_.isObject(value[key])) {
      result.push(
        `${getSpacesText(spaces)}${key}: ${formatValue(value[key], spaces + 1)}`,
      );
    } else {
      result.push(
        `${getSpacesText(spaces)}${key}: ${value[key]}`,
      );
    }
  });

  result.push(`${getSpacesText(spaces - 1)}}`);
  return result.join('\n');
};

const format = (data, spaces = 1) => {
  const result = [];
  result.push('{');

  data.forEach((line) => {
    switch (line.type) {
      case 'deep':
        result.push(
          `${getSpacesText(spaces)}${line.key}: ${format(
            line.value,
            spaces + 1,
          )}`,
        );
        break;
      case 'equal':
        result.push(
          `${getSpacesText(spaces, true)}   ${line.key}: ${formatValue(
            line.value,
            spaces + 1,
          )}`,
        );
        break;
      case 'added':
        result.push(
          `${getSpacesText(spaces, true)} + ${line.key}: ${formatValue(
            line.value,
            spaces + 1,
          )}`,
        );
        break;
      case 'removed':
        result.push(
          `${getSpacesText(spaces, true)} - ${line.key}: ${formatValue(
            line.value,
            spaces + 1,
          )}`,
        );
        break;
      case 'changed':
        result.push(
          `${getSpacesText(spaces, true)} - ${line.key}: ${formatValue(
            line.value,
            spaces + 1,
          )}`,
        );
        result.push(
          `${getSpacesText(spaces, true)} + ${line.key}: ${formatValue(
            line.newValue,
            spaces + 1,
          )}`,
        );
        break;
      default:
        console.log('unknown');
    }
  });
  result.push(`${getSpacesText(spaces - 1)}}`);

  return result.join('\n');
};

export default format;
