import _ from 'lodash';


const stateList = [
  {
    check: (configBefore, configAfter, name) => !_.has(configBefore, name)
      && _.has(configAfter, name),
    make: (configBefore, configAfter, name) => ({
      name, oldValue: null, newValue: configAfter[name], state: 'added',
    }),
  },
  {
    check: (configBefore, configAfter, name) => _.has(configBefore, name)
      && !_.has(configAfter, name),
    make: (configBefore, configAfter, name) => ({
      name, oldValue: configBefore[name], newValue: null, state: 'deleted',
    }),
  },
  {
    check: (configBefore, configAfter, name) => _.has(configBefore, name)
      && _.has(configAfter, name) && _.isObject(configBefore[name])
      && _.isObject(configAfter[name]),
    make: (configBefore, configAfter, name, f) => ({
      name,
      state: 'nested',
      childrens: f(configBefore[name], configAfter[name]),
    }),
  },
  {
    check: (configBefore, configAfter, name) => _.has(configBefore, name)
      && _.has(configAfter, name) && configBefore[name] === configAfter[name],
    make: (configBefore, configAfter, name) => ({
      name, oldValue: configBefore[name], newValue: configAfter[name], state: 'unchanged',
    }),
  },
  {
    check: (configBefore, configAfter, name) => _.has(configBefore, name)
      && _.has(configAfter, name) && configBefore[name] !== configAfter[name],
    make: (configBefore, configAfter, name) => ({
      name, oldValue: configBefore[name], newValue: configAfter[name], state: 'changed',
    }),
  },
];

const getState = (oldValue, newValue, name) => stateList
  .find(({ check }) => check(oldValue, newValue, name));

const buildAst = (configBefore, configAfter) => {
  const configKeysMerged = _.union(_.keys(configBefore), _.keys(configAfter));

  return configKeysMerged.map(name => getState(configBefore, configAfter, name)
    .make(configBefore, configAfter, name, buildAst));
};

export default buildAst;
