module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "max-len": [2, 120, 4],
        "no-param-reassign": 0,
        "no-restricted-globals": 0,
        "semi": ["error", "always"],
        "quotes": ["error", "double"], 
        "no-unused-vars": "off",
        "func-names":"off",
        "indent":"off",
        "no-else-return":"off",
        "prefer-arrow-callback":"off",
        "no-undef":"off",
        "no-use-before-define":"off",
        "comma-dangle":"off",
        "eol-last":"off",
        "no-trailing-spaces":"off",
        "linebreak-style":"off",
        "no-console":"off",
        "no-restricted-globals":"off",
        "object-shorthand":"off",
        "no-shadow":"off",
        "no-debugger":"off",
        "prefer-const":"off",
        "no-multiple-empty-lines":"off"

    }
};
