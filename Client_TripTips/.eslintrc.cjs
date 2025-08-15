module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    semi: ["error", "always"] ,
    quotes: ['error', 'double'],
    'max-len': ['error', { code: 200 }],
  },
  globals: {
    console: 'readonly', // הוסף את השורה הזו
  },
  env: {
    browser: true,  // זו הסביבה שבה `document` מוגדר
    node: true      // אם יש לך קוד צד-שרת, הוסף גם את זה
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
