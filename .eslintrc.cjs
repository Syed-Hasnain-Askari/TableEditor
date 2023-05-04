module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'react/jsx-filename-extension':
			'off',
		'prettier/prettier': 'error',
		'no-console': 'warn',
		'no-eval': 'error',
		'import/first': 'error',
		'no-unused-vars': 'warn',
	},
};
