import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
	title: 'Atoms/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				story:
					'Default demonstrates the common hover affordance. Variants show the supported placements, longer content, and delayed reveal state.',
			},
		},
	},
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
export const Controls: Story = {
	args: {
		content: 'Helpful context for this plan',
		side: 'top',
		delayDuration: 0,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const body = within(canvasElement.ownerDocument.body);
		await userEvent.hover(canvas.getByRole('button', { name: /hover me/i }));
		expect(await body.findByText('Helpful context for this plan')).toBeInTheDocument();
	},
};
export const Top: Story = { args: { side: 'top' } };
export const Bottom: Story = { args: { side: 'bottom' } };
export const Left: Story = { args: { side: 'left' } };
export const Right: Story = { args: { side: 'right' } };
export const Variants: Story = {
	render: () => (
		<div className='grid grid-cols-2 gap-4'>
			<Tooltip content='Top tooltip' side='top'>
				<Button variant='secondary'>Top</Button>
			</Tooltip>
			<Tooltip content='Bottom tooltip' side='bottom'>
				<Button variant='secondary'>Bottom</Button>
			</Tooltip>
			<Tooltip content='Left tooltip' side='left'>
				<Button variant='secondary'>Left</Button>
			</Tooltip>
			<Tooltip content='Right tooltip' side='right'>
				<Button variant='secondary'>Right</Button>
			</Tooltip>
		</div>
	),
};
export const WithLongContent: Story = {
	args: {
		content: 'This tooltip explains a longer billing concept without taking over the interface.',
	},
};
export const WithDelay: Story = {
	args: { delayDuration: 1000 },
};
