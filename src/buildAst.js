import _ from 'lodash';


const typeList = [
  {
    check: (configBefore, configAfter, name) => !_.has(configBefore, name)
      && _.has(configAfter, name),
    make: (configBefore, configAfter, name) => ({
      name, newValue: configAfter[name], type: 'added',
    }),
  },
  {
    check: (configBefore, configAfter, name) => _.has(configBefore, name)
      && !_.has(configAfter, name),
    make: (configBefore, configAfter, name) => ({
      name, oldValue: configBefore[name], type: 'deleted',
    }),
  },
  {
    check: (configBefore, configAfter, name) => _.has(configBefore, name)
      && _.has(configAfter, name) && _.isObject(configBefore[name])
      && _.isObject(configAfter[name]),
    make: (configBefore, configAfter, name, f) => ({
      name,
      type: 'nested',
      childrens: f(configBefore[name], configAfter[name]),
    }),
  },
  {
    check: (configBefore, configAfter, name) => _.has(configBefore, name)
      && _.has(configAfter, name) && configBefore[name] === configAfter[name],
    make: (configBefore, configAfter, name) => ({
      name, oldValue: configBefore[name], newValue: configAfter[name], type: 'unchanged',
    }),
  },
  {
    check: (configBefore, configAfter, name) => _.has(configBefore, name)
      && _.has(configAfter, name) && configBefore[name] !== configAfter[name],
    make: (configBefore, configAfter, name) => ({
      name, oldValue: configBefore[name], newValue: configAfter[name], type: 'changed',
    }),
  },
];

const getType = (oldValue, newValue, name) => typeList
  .find(({ check }) => check(oldValue, newValue, name));

const buildAst = (configBefore, configAfter) => {
  const configKeysMerged = _.union(_.keys(configBefore), _.keys(configAfter));

  return configKeysMerged.map(name => getType(configBefore, configAfter, name)
    .make(configBefore, configAfter, name, buildAst));
};

export default buildAst;
