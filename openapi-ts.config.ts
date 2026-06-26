import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
	input: './api-spec/express-hybrid-auth-api.yml',
	output: {
		format: 'prettier',
		path: './src/api/generated',
	},
	plugins: [
		{
			name: '@hey-api/client-fetch',
			runtimeConfigPath: './src/api/fetch-client-config.ts',
		},
		'@hey-api/schemas',
		{
			dates: true,
			name: '@hey-api/transformers',
		},
		{
			enums: 'javascript',
			name: '@hey-api/typescript',
		},
		{
			name: '@hey-api/sdk',
			transformer: true,
		},
		'@tanstack/react-query',
	],
});
