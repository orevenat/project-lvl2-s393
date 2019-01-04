install:
	npm install

run:
	npx babel-node -- 'src/bin/gendiff.js' 10

build:
	rm -rf dist
	npm run build

test:
	npm test

test-watch:
	npm test -- --watch

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test
