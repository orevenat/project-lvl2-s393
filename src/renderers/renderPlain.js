import _ from 'lodash';

const stringify = (str) => {
  if (_.isObject(str)) {
    return '[complex value]';
  }
  if (typeof str === 'string') {
    return `'${str}'`;
  }
  if (typeof str === 'boolean') {
    return str ? 'true' : 'false';
  }
  return str;
};

const actionList = {
  nested: (item, name, f) => f(item.childrens, name),
  changed: (item, name) => `Property '${name.join('.')}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`,
  added: (item, name) => `Property '${name.join('.')}' was added with value: ${stringify(item.newValue)}`,
  deleted: (item, name) => `Property '${name.join('.')}' was removed`,
};

const renderItem = (item, parents, f) => actionList[item.type](item, [...parents, item.name], f);

const render = (nodeList, parents) => (
  _.flatten(nodeList.filter(item => item.type !== 'unchanged').map(item => renderItem(item, parents, render)))
);

export default ast => render(ast, []).join('\n');
