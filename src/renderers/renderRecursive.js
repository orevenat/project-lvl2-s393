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

const renderLine = (item, depth, f) => {
  const itemSpace = '    '.repeat(depth);
  const newDepth = depth + 1;
  const objectSpace = '    '.repeat(newDepth);
  switch (item.type) {
    case 'nested':
      return [`${objectSpace}${item.name}: {`, f(item.childrens, newDepth), `${objectSpace}}`];
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
      throw new TypeError(`${item.type} not exist`);
  }
};

const renderDiff = (ast, depth) => (
  (ast.reduce((acc, item) => [...acc, renderLine(item, depth, renderDiff)], []))
);

export default ast => ['{', ..._.flattenDeep(renderDiff(ast, 0)), '}'].join('\n');
