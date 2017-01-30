SHELL := /bin/bash

PWD := $(shell pwd)

.PHONY: npm
npm:
	@echo "Install node packages"
	npm install

.PHONY: typescript
typescript:
	@echo "Transpile src typescript"
	$(PWD)/node_modules/.bin/tsc --project ./

typescript-watch:
	@echo "Transpile src typescript (watching for changes)"
	$(PWD)/node_modules/.bin/tsc --project ./  --watch

.PHONY: lint
lint:
	echo "Run tslint"
	node $(PWD)/node_modules/.bin/tslint --config $(PWD)/node_modules/tslint-rules/tslint.json --project $(PWD)/tsconfig.json

setup: npm typescript

clean:
	@echo "Remove node_modules and bower_components"
	rm -rf $(PWD)/node_modules
