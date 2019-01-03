import _ from 'lodash';
import fs from 'fs';
// import half from './half';

export default (before, after) => {
  const configBefore = JSON.parse(fs.readFileSync(before, 'utf8'));
  const configAfter = JSON.parse(fs.readFileSync(after, 'utf8'));
  const keysBefore = Object.keys(configBefore);
  const keysAfter = Object.keys(configAfter);
  const keysMerged = _.uniq(keysBefore.concat(keysAfter));
  const parseResult = keysMerged.map(key => ({
    name: key,
    oldValue: _.has(configBefore, key) ? configBefore[key] : null,
    newValue: _.has(configAfter, key) ? configAfter[key] : null,
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
