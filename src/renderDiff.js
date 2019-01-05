import _ from 'lodash';

const renderValue = (value, depth) => {
  if (value instanceof Object) {
    const newDepth = depth + 1;
    const itemSpace = '    '.repeat(newDepth);
    const values = _.keys(value).reduce((acc, key) => {
      return `${acc}${itemSpace}    ${key}: ${value[key]}\n`;
    }, '');

    return `{\n${values}${itemSpace}}`;
  }

  return value;
};

const renderLine = (item, depth) => {
  const itemSpace = '    '.repeat(depth);
  if (item.state === 'unchanged') {
    return `${itemSpace}    ${item.name}: ${renderValue(item.newValue, depth)}`;
  } else if (item.state === 'changed') {
    return [
      `${itemSpace}  + ${item.name}: ${renderValue(item.newValue, depth)}`,
      `${itemSpace}  - ${item.name}: ${renderValue(item.oldValue, depth)}`];
  } else if (item.state === 'deleted') {
    return `${itemSpace}  - ${item.name}: ${renderValue(item.oldValue, depth)}`;
  } else if (item.state === 'added') {
    return `${itemSpace}  + ${item.name}: ${renderValue(item.newValue, depth)}`;
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
