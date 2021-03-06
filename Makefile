SHELL := /bin/bash

PWD := $(shell pwd)
ENV := development
BASE_DIR := ./
ROOT_DIR := ./
BUILD_DIR := build
PUBLIC_DIR := src/Aap/BlogBundle/Resources/public
GIT_URL := https://github.com/joppe/blog.git
SSH_URL := apesblog@apestaartje.info
REMOTE_ROOT_DIR := /home/apesblog/public_html
TARGET_ROOT_DIR := $(SSH_URL):$(REMOTE_ROOT_DIR)

# ifeq ($(ENV),production)
# endif

ensure_build_dir:
	@if [ -d "$(BUILD_DIR)" ]; \
	then \
		echo "Remove old build dir"; \
		rm -rf $(BUILD_DIR); \
	fi \

	@echo "Create build dir"
	@mkdir build

checkout: ensure_build_dir
	@echo "Checkout"
	@cd $(BUILD_DIR) && git clone $(GIT_URL) .
	@cd $(BUILD_DIR) && rm -rf .git

sass:
	@echo "Compile SASS"
	@cd $(PUBLIC_DIR) && sass --style=compact --update --force --scss --no-cache sass:css

babel:
	@echo "Transpile javascript"
	$(PWD)/node_modules/babel/bin/babel.js $(PUBLIC_DIR)/src --stage 1 --out-dir $(PUBLIC_DIR)/js --modules system

babel-watch:
	@echo "Transpile javascript"
	$(PWD)/node_modules/babel/bin/babel.js $(PUBLIC_DIR)/src --stage 1 --out-dir $(PUBLIC_DIR)/js --modules system --watch

bower:
	@echo "Install bower packages"
	@cd $(ROOT_DIR) && bower install

npm:
	@echo "Install node packages"
	@cd $(ROOT_DIR) && npm install

composer:
	@echo "Install composer packages"
	@cd $(ROOT_DIR) && composer install

setup: composer npm bower sass babel
	@echo "Setup done"

build: checkout

simulate: PUBLIC_DIR := $(BUILD_DIR)/$(PUBLIC_DIR)
simulate: ROOT_DIR := $(BUILD_DIR)/$(ROOT_DIR)
simulate: ENV := production
simulate: checkout setup
	@echo "Deploy - DRY RUN"
	@rsync --verbose --recursive --links --dry-run --compress --checksum --delete --exclude-from=rsync.exclude $(ROOT_DIR) $(TARGET_ROOT_DIR)

deploy: PUBLIC_DIR := $(BUILD_DIR)/$(PUBLIC_DIR)
deploy: ROOT_DIR := $(BUILD_DIR)/$(ROOT_DIR)
deploy: ENV := production
deploy: checkout setup
	@echo "Deploy"
	@cd $(ROOT_DIR) && symlinks -cr .
	@rsync --verbose --recursive --links --compress --checksum --delete --exclude-from=rsync.exclude $(ROOT_DIR) $(TARGET_ROOT_DIR)
	@echo "Clear remote cache"
	@ssh $(SSH_URL) "cd $(REMOTE_ROOT_DIR) && php app/console --env=production cache:clear"
