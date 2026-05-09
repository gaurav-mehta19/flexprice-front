import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
	title: 'Atoms/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	argTypes: {
		content: { control: 'text' },
		side: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
		delayDuration: { control: 'number' },
		children: { control: false },
	},
	args: {
		content: 'Helpful context',
		side: 'top',
		children: <Button variant='secondary'>Hover me</Button>,
	},
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {};
export const Top: Story = { args: { side: 'top' } };
export const Bottom: Story = { args: { side: 'bottom' } };
export const Left: Story = { args: { side: 'left' } };
export const Right: Story = { args: { side: 'right' } };
export const WithLongContent: Story = {
	args: {
		content: 'This tooltip explains a longer billing concept without taking over the interface.',
	},
};
export const WithDelay: Story = {
	args: { delayDuration: 1000 },
};
