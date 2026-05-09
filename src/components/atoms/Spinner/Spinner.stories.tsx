import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
	title: 'Atoms/Spinner',
	component: Spinner,
	tags: ['autodocs'],
	argTypes: {
		size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
		fullPage: { control: 'boolean' },
		text: { control: 'text' },
		className: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Sizes: Story = {
	render: () => (
		<div className='flex items-center gap-6'>
			<Spinner size='sm' />
			<Spinner size='md' />
			<Spinner size='lg' />
			<Spinner size='xl' />
		</div>
	),
};

export const FullPage: Story = {
	args: { fullPage: true, text: 'Loading workspace' },
};

export const WithText: Story = {
	args: { text: 'Loading data' },
};
