# @script-augur/vite-plugin-svg-sprite

Build-time SVG sprite generation with optional SVGO and `.d.ts` symbol IDs.

## Install

```bash
pnpm add -D @script-augur/vite-plugin-svg-sprite
# optional
pnpm add -D svgo
```

## Usage

```ts
import { defineConfig } from 'vite'
import svgSprite from '@script-augur/vite-plugin-svg-sprite'

export default defineConfig({
  plugins: [
    svgSprite({
      inputDir: 'src/icons',
      dtsOutputFile: 'src/svg-sprite.d.ts',
      useSvgo: false,
    }),
  ],
})
```

Import the virtual module:

```ts
import sprite from 'virtual:svg-sprite'
```
