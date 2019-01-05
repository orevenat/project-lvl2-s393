import _ from 'lodash';

const renderValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const newDepth = depth + 1;
  const itemSpace = '    '.repeat(newDepth);
  const values = _.keys(value).reduce((acc, key) => `${acc}${itemSpace}    ${key}: ${value[key]}\n`, '');

  return `{\n${values}${itemSpace}}`;
};

const renderLine = (item, depth) => {
  const itemSpace = '    '.repeat(depth);
  switch (item.state) {
    case 'unchanged':
      return `${itemSpace}    ${item.name}: ${renderValue(item.newValue, depth)}`;
    case 'changed':
      return [
        `${itemSpace}  + ${item.name}: ${renderValue(item.newValue, depth)}`,
        `${itemSpace}  - ${item.name}: ${renderValue(item.oldValue, depth)}`];
    case 'deleted':
      return `${itemSpace}  - ${item.name}: ${renderValue(item.oldValue, depth)}`;
    case 'added':
      return `${itemSpace}  + ${item.name}: ${renderValue(item.newValue, depth)}`;
    default:
      return '';
  }
};

const renderDiff = (ast, depth) => (ast.reduce((acc, item) => {
  if (item.childrens instanceof Array) {
    const newDepth = depth + 1;
    const objectSpace = '    '.repeat(newDepth);
    return [...acc, `${objectSpace}${item.name}: {`, renderDiff(item.childrens, newDepth), `${objectSpace}}`];
  }

  return [...acc, renderLine(item, depth)];
}, []));

export default ast => `{\n${_.flattenDeep(renderDiff(ast, 0)).join('\n')}\n}`;
