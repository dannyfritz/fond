module.exports = {
  "root": true,
  "plugins": [
    "html"
  ],
  "extends": ["es2015", "standard"],
  "parser": "typescript-eslint-parser",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "quotes": ["error", "template"],
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
