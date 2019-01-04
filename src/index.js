import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers';

const readingFile = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  const fileExtension = path.extname(filepath);
  return [content, fileExtension];
};

export default (filepath1, filepath2) => {
  const parsedContent1 = parsers(...readingFile(filepath1));
  const parsedContent2 = parsers(...readingFile(filepath2));
  const keys1 = Object.keys(parsedContent1);
  const keys2 = Object.keys(parsedContent2);
  const keysMerged = _.uniq(keys1.concat(keys2));
  const parseResult = keysMerged.map(key => ({
    name: key,
    oldValue: _.has(parsedContent1, key) ? parsedContent1[key] : null,
    newValue: _.has(parsedContent2, key) ? parsedContent2[key] : null,
  }));

  const renderResult = parseResult.map((item) => {
    if (item.oldValue === item.newValue) {
      return `    ${item.name}: ${item.newValue}`;
    }

    if (item.oldValue === null) {
      return `  + ${item.name}: ${item.newValue}`;
    }

    if (item.newValue === null) {
      return `  - ${item.name}: ${item.oldValue}`;
    }

    return `  + ${item.name}: ${item.newValue}\n  - ${item.name}: ${item.oldValue}`;
  });

  return `{\n${renderResult.join('\n')}\n}`;
};
