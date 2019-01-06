import renderPlain from './renderPlain';
import renderRecursive from './renderRecursive';
import renderJson from './renderJson';

const rendererList = {
  recursive: renderRecursive,
  plain: renderPlain,
  json: renderJson,
};

export default (ast, format) => rendererList[format](ast);
