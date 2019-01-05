import renderPlain from './renderPlain';
import renderRecursive from './renderRecursive';

const formatList = {
  recursive: renderRecursive,
  plain: renderPlain,
};

export default (ast, format) => formatList[format](ast);
