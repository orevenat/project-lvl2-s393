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
  changed: item => `updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`,
  added: item => `added with value: ${stringify(item.newValue)}`,
  deleted: () => 'removed',
};

const renderItem = (item, parents) => {
  const name = [...parents, item.name].join('.');
  return `Property '${name}' was ${actionList[item.type](item)}`;
};

const render = (nodeList, parents) => {
  const result = nodeList.filter(item => item.type !== 'unchanged').map((item) => {
    if (item.type === 'nested') {
      return render(item.childrens, [...parents, item.name]);
    }

    return renderItem(item, parents);
  });

  return _.flatten(result);
};

export default ast => render(ast, []).join('\n');
