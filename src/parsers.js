import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parsersList = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  const fileExtension = path.extname(filepath);
  return parsersList[fileExtension](content);
};
