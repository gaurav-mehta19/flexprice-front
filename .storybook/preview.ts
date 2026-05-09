import './storybook-env';

import type { Preview, StoryFn, StoryContext } from '@storybook/react';

// Import global styles
import '../src/index.css';
import React from 'react';

const withContainer = (Story: StoryFn, context: StoryContext) => {
	const container = context.parameters?.container as string | undefined;
	const sandboxHeight = context.parameters?.sandboxHeight as number | undefined;
	const gridClass = context.parameters?.gridClass as string | undefined;

	if (container === 'fixed') {
		return React.createElement('div', { className: 'w-80 p-6' }, React.createElement(Story));
	}

	if (container === 'wide') {
		return React.createElement('div', { className: 'w-[520px] p-6' }, React.createElement(Story));
	}

	if (gridClass) {
		return React.createElement('div', { className: gridClass }, React.createElement(Story));
	}

	if (sandboxHeight) {
		return React.createElement('div', { style: { height: `${sandboxHeight}px` } }, React.createElement(Story));
	}

	return React.createElement(Story);
};

const preview: Preview = {
	decorators: [withContainer],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
