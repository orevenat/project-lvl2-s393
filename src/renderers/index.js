import renderPlain from './renderPlain';
import renderRecursive from './renderRecursive';

const rendererList = {
  recursive: renderRecursive,
  plain: renderPlain,
};

export default (ast, format) => rendererList[format](ast);
