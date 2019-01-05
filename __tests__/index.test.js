import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const fileTypes = ['.json', '.yml', '.ini'];

const testList = (fileType) => {
  const fixturePath = path.resolve('__tests__/__fixtures__/');
  const configOne = `${fixturePath}/config_before${fileType}`;
  const configTwo = `${fixturePath}/config_after${fileType}`;
  const expectedDiff = fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`, 'utf8');

  return [fileType, configOne, configTwo, expectedDiff];
};

test.each(fileTypes.map(testList))(
  'test (%s)',
  (fileType, configOne, configTwo, expectedDiff) => {
    expect(genDiff(configOne, configTwo)).toBe(expectedDiff);
  },
);

const testRecursiveList = (fileType) => {
  const fixturePath = path.resolve('__tests__/__fixtures__/');
  const configOne = `${fixturePath}/config_before_recursive${fileType}`;
  const configTwo = `${fixturePath}/config_after_recursive${fileType}`;
  const expectedDiff = fs.readFileSync(`${__dirname}/__fixtures__/expected_recursive.txt`, 'utf8');
  const expectedDiffPlain = fs.readFileSync(`${__dirname}/__fixtures__/expected_recursive_plain.txt`, 'utf8');

  return [fileType, configOne, configTwo, expectedDiff, expectedDiffPlain];
};

test.each(fileTypes.map(testRecursiveList))(
  'test (%s)',
  (fileType, configOne, configTwo, expectedDiff, expectedDiffPlain) => {
    expect(genDiff(configOne, configTwo)).toBe(expectedDiff);
    expect(genDiff(configOne, configTwo, 'plain')).toBe(expectedDiffPlain);
  },
);
