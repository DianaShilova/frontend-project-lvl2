import _ from 'lodash';

const getSpacesText = (level = 0, hasPrefix = false) => {
  if (hasPrefix) {
    return level <= 0 ? ' '.repeat(2) : ' '.repeat(level * 4 - 3);
  }
  return level <= 0 ? ' '.repeat(0) : ' '.repeat(level * 4);
};

const formatValue = (value, spaces) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const result = _.sortBy(Object.keys(value)).map((key) => {
    if (_.isObject(value[key])) {
      return `${getSpacesText(spaces)}${key}: ${formatValue(value[key], spaces + 1)}`;
    }
    return `${getSpacesText(spaces)}${key}: ${value[key]}`;
  });

  return ['{', ...result, `${getSpacesText(spaces - 1)}}`].join('\n');
};

const format = (data, spaces = 1) => {
  const result = data.map((line) => {
    switch (line.type) {
      case 'deep':
        return (
          `${getSpacesText(spaces)}${line.key}: ${format(
            line.value,
            spaces + 1,
          )}`);
      case 'equal':
        return (
          `${getSpacesText(spaces, true)}   ${line.key}: ${formatValue(
            line.value,
            spaces + 1,
          )}`);
      case 'added':
        return (
          `${getSpacesText(spaces, true)} + ${line.key}: ${formatValue(
            line.value,
            spaces + 1,
          )}`);
      case 'removed':
        return (
          `${getSpacesText(spaces, true)} - ${line.key}: ${formatValue(
            line.value,
            spaces + 1,
          )}`);
      case 'changed':
        return (
          `${getSpacesText(spaces, true)} - ${line.key}: ${formatValue(
            line.value,
            spaces + 1,
          )}\n${getSpacesText(spaces, true)} + ${line.key}: ${formatValue(
            line.newValue,
            spaces + 1,
          )}`);
      default:
        throw new Error('unknown');
    }
  });

  return ['{', ...result, `${getSpacesText(spaces - 1)}}`].join('\n');
};

export default format;
