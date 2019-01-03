import fs from 'fs';
import genDiff from '../src';
import configOne from './__fixtures__/config1.json';
import configTwo from './__fixtures__/config2.json';

const expectedDiff = fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`, 'utf8');

test('genDiff', () => {
  expect(genDiff(configOne, configTwo)).toBe(expectedDiff);
});
