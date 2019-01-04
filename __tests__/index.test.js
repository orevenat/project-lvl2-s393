import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const fileTypes = ['.json', '.yml', '.ini'];

const testList = (fileType) => {
  const fixturePath = path.resolve('__tests__/__fixtures__/');
  const configOne = `${fixturePath}/config1${fileType}`;
  const configTwo = `${fixturePath}/config2${fileType}`;
  const expectedDiff = fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`, 'utf8');

  return [fileType, configOne, configTwo, expectedDiff];
};

test.each(fileTypes.map(testList))(
  'test (%s)',
  (fileType, configOne, configTwo, expectedDiff) => {
    expect(genDiff(configOne, configTwo)).toBe(expectedDiff);
  },
);
