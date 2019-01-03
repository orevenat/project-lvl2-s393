import _ from 'lodash';
// import half from './half';

export default (configBefore, configAfter) => {
  const keysBefore = Object.keys(configBefore);
  const keysAfter = Object.keys(configAfter);
  const keysMerged = _.uniq(keysBefore.concat(keysAfter));
  const result = keysMerged.map((key) => {
    if (_.has(configBefore, key)) {
      if (_.has(configAfter, key)) {
        if (configAfter[key] === configBefore[key]) {
          return `    ${key}: ${configAfter[key]}`;
        }
        return `  + ${key}: ${configAfter[key]}\n  - ${key}: ${configBefore[key]}`;
      }
      return `  - ${key}: ${configBefore[key]}`;
    }
    return `  + ${key}: ${configAfter[key]}`;
  }).join('\n');

  return `{\n${result}\n}`;
};
