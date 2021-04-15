export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	viewport: {
		viewports: [
			{
				name: 'Minimal Desktop',
				styles: {
					width: '1024px',
					height: '768px',
				},
				type: 'desktop',
			},
			{
				name: 'Tablet',
				styles: {
					width: '768px',
					height: '514px',
				},
				type: 'desktop',
			},
			{
				name: 'Minimal Mobile',
				styles: {
					width: '320px',
					height: '514px',
				},
				type: 'desktop',
			},
		],
		defaultViewport: 'Minimal Desktop',
	},
}
