# /bin/bash

# # PNPM setup
pnpm config set store-dir ~/.local/share/pnpm/store

# Install Biome
npm install -g @biomejs/biome

# Install dependencies
pnpm install