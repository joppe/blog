SHELL := /bin/bash

ENV := development
BASE_DIR := ./
ROOT_DIR := ./
BUILD_DIR := build
PUBLIC_DIR := src/Aap/BlogBundle/Resources/public
GIT_URL := https://github.com/joppe/blog.git
SSH_URL := apesblog@apestaartje.info
TARGET_ROOT_DIR := $(SSH_URL):/home/apesblog/public_html

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

bower:
	@echo "Install bower packages"
	@cd $(ROOT_DIR) && bower install

npm:
	@echo "Install node packages"
	@cd $(ROOT_DIR) && npm install

composer:
	@echo "Install composer packages"
	@cd $(ROOT_DIR) && composer install

setup: composer npm bower sass
	@echo "Setup done"

build: checkout

simulate: PUBLIC_DIR := $(BUILD_DIR)/$(PUBLIC_DIR)
simulate: ROOT_DIR := $(BUILD_DIR)/$(ROOT_DIR)
simulate: ENV := production
simulate: checkout setup
	rsync --verbose --recursive --links --dry-run --compress --checksum --delete --exclude-from=rsync.exclude $(ROOT_DIR) $(TARGET_ROOT_DIR)

deploy: PUBLIC_DIR := $(BUILD_DIR)/$(PUBLIC_DIR)
deploy: ROOT_DIR := $(BUILD_DIR)/$(ROOT_DIR)
deploy: ENV := production
deploy: checkout setup
	rsync --verbose --recursive --links --compress --checksum --delete --exclude-from=rsync.exclude $(ROOT_DIR) $(TARGET_ROOT_DIR)
