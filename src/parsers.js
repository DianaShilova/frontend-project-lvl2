import { load } from 'js-yaml';

const getParser = (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);

    case 'yml':
      return load(file);

    case 'yaml':
      return load(file);

    default:
      throw new Error(`Unknown fornmat: ${format}. You must use JSON/YAML/YML.`);
  }
};

export default getParser;
