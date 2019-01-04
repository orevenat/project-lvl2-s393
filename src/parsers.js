import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parsersList = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  const fileExtension = path.extname(filepath);
  return parsersList[fileExtension](content);
};
