import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAST from './buildAst';
import render from './renderers';

const readFile = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  const fileExtension = path.extname(filepath);
  return [content, fileExtension];
};

export default (filepathBefore, filepathAfter, format = 'recursive') => {
  const configBefore = parse(...readFile(filepathBefore));
  const configAfter = parse(...readFile(filepathAfter));

  const ast = buildAST(configBefore, configAfter);

  return render(ast, format);
};
