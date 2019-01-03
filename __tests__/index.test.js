import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test('genDiff', () => {
  const fixturePath = path.resolve('__tests__/__fixtures__/');
  const configOne = `${fixturePath}/config1.json`;
  const configTwo = `${fixturePath}/config2.json`;
  const expectedDiff = fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`, 'utf8');

  expect(genDiff(configOne, configTwo)).toBe(expectedDiff);
});
