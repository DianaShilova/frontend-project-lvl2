import _ from 'lodash';

const stylish = (data, spaces) => {
  const spacesText = ' '.repeat(spaces * 2);
  data.forEach((line) => {
    if (_.isArray(line.value)) {
      stylish(line.value);
    } else {
      switch (line.type) {
        case '+':
          console.log(`${spacesText}${line.type} ${line.key}: ${line.value}\n`);
          break;
        case '-':
          console.log(`${spacesText}${line.type} ${line.key}: ${line.value}\n`);
          break;
        case '=':
          console.log(`${spacesText}  ${line.key}: ${line.value}`);
          break;
        case '*':
          console.log(`${spacesText}  ${line.key}: ${line.value}`);
          break;
        default:
          throw new Error(`Type: ${line.type} is undefined`);
      }
    }
  });
};

export default stylish;
