import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { STATUS_MAP } from '@/lib/statusMaps';

const meta: Meta<typeof Badge> = {
	title: 'Atoms/Badge',
	component: Badge,
	tags: ['autodocs'],
	argTypes: {
		status: { control: 'text' },
		size: { control: 'select', options: ['sm', 'md'] },
		dot: { control: 'boolean' },
		label: { control: 'text' },
		className: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const AllStatuses: Story = {
	render: () => (
		<div className='grid grid-cols-3 gap-3'>
			{Object.keys(STATUS_MAP).map((status) => (
				<Badge key={status} status={status} />
			))}
		</div>
	),
};

export const WithDot: Story = {
	args: { status: 'paid', dot: true },
};

export const Small: Story = {
	args: { status: 'trialing', size: 'sm' },
};

export const WithCustomLabel: Story = {
	args: { status: 'active', label: 'Live' },
};
