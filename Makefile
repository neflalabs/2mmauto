.PHONY: dev build install clean

# Default to dev
all: dev

install:
	bun install

dev:
	bun run dev

build:
	bun run build

preview:
	bun run preview

clean:
	rm -rf dist node_modules
