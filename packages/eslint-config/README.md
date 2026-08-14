# @script-augur/eslint-config

Shareable ESLint flat config for Script-Augur apps.

Owns **all** import/module structure:

- `import/order` — sort imports by kind
- `@script-augur/eslint-plugin-module-ordering` — reorder file sections

Do **not** add Prettier import-sort plugins; they conflict with these rules.

## Usage

```js
// eslint.config.js
import { createScriptAugurEslintConfig } from '@script-augur/eslint-config'
import convexPlugin from '@convex-dev/eslint-plugin'
import { tanstackConfig } from '@tanstack/eslint-config'
import reactPlugin from 'eslint-plugin-react'

export default createScriptAugurEslintConfig({
  tanstackConfig,
  convexConfigs: convexPlugin.configs.recommended,
  reactPlugin,
})
```
