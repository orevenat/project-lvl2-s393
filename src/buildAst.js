import _ from 'lodash';
import { isObject } from 'util';

const buildAst = (configBefore, configAfter) => {
  const configKeysMerged = _.union(_.keys(configBefore), _.keys(configAfter));

  return configKeysMerged.map((name) => {
    if (isObject(configBefore[name]) && isObject(configAfter[name])) {
      return {
        name,
        childrens: buildAst(configBefore[name], configAfter[name]),
      };
    }

    const res = {
      name,
      oldValue: _.has(configBefore, name) ? configBefore[name] : null,
      newValue: _.has(configAfter, name) ? configAfter[name] : null,
    };

    if (res.oldValue === res.newValue) {
      return { ...res, state: 'unchanged' };
    }

    if (res.oldValue === null) {
      return { ...res, state: 'added' };
    }

    if (res.newValue === null) {
      return { ...res, state: 'deleted' };
    }

    return { ...res, state: 'changed' };
  });
};

export default buildAst;
