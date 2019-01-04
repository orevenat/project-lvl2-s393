import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers';

const readingFile = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  const fileExtension = path.extname(filepath);
  return [content, fileExtension];
};

export default (filepathBefore, filepathAfter) => {
  const configBefore = parsers(...readingFile(filepathBefore));
  const configAfter = parsers(...readingFile(filepathAfter));
  const configKeysBefore = Object.keys(configBefore);
  const configKeysAfter = Object.keys(configAfter);
  const configKeysMerged = _.uniq(configKeysBefore.concat(configKeysAfter));
  const diffResult = configKeysMerged.map(key => ({
    name: key,
    oldValue: _.has(configBefore, key) ? configBefore[key] : null,
    newValue: _.has(configAfter, key) ? configAfter[key] : null,
  }));

  const renderResult = diffResult.map((item) => {
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
