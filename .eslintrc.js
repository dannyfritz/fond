module.exports = {
  "root": true,
  "plugins": [
    "html",
    "typescript",
    "import",
    "node",
    "promise",
  ],
  "extends": ["es2015", "standard"],
  "parser": "typescript-eslint-parser",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "brace-style": ["error", "allman"],
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "never",
      "exports": "never",
      "functions": "ignore",
    }],
    "arrow-parens": ["error", "always"]
  }
}
