module.exports = {
	env: {
	  browser: true,
	  commonjs: true,
	  es2021: true,
	},
	"extends": [
		"react-app",
		"plugin:prettier/recommended"
	  ],
	"parser": "babel-eslint",
	overrides: [],
	"parserOptions": {
		"jsx": "react",
		"ecmaFeatures": {
		  "jsx": true,
		  "modules": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	  },
	plugins: ['import', 'prettier'],
	rules: {
	  indent: ['error', 2],
	  quotes: ['error', 'single'],
	  semi: ['error', 'always'],
	  'comma-dangle': ['error', 'never'],
	  'max-len': [
		'error',
		{
		  code: 90,
		},
	  ],
	},
  };
  