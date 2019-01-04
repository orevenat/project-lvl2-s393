import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test('genDiffJson', () => {
  const fixturePath = path.resolve('__tests__/__fixtures__/');
  const configOne = `${fixturePath}/config1.json`;
  const configTwo = `${fixturePath}/config2.json`;
  const expectedDiff = fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`, 'utf8');

  expect(genDiff(configOne, configTwo)).toBe(expectedDiff);
});


test('genDiffYml', () => {
  const fixturePath = path.resolve('__tests__/__fixtures__/');
  const configOne = `${fixturePath}/config1.yml`;
  const configTwo = `${fixturePath}/config2.yml`;
  const expectedDiff = fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`, 'utf8');

  expect(genDiff(configOne, configTwo)).toBe(expectedDiff);
});
