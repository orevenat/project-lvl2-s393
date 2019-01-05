import fs from 'fs';
import path from 'path';
import parsers from './parsers';
import build from './buildAst';
import render from './renderDiff';

const readFile = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  const fileExtension = path.extname(filepath);
  return [content, fileExtension];
};

export default (filepathBefore, filepathAfter, format = 'recursive') => {
  const configBefore = parsers(...readFile(filepathBefore));
  const configAfter = parsers(...readFile(filepathAfter));

  const ast = build(configBefore, configAfter);

  return render(ast, format);
};
