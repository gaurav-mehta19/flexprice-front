import type { Meta, StoryObj } from '@storybook/react';
import { InvoiceStatusBadge } from './InvoiceStatusBadge';

const meta: Meta<typeof InvoiceStatusBadge> = {
	title: 'Molecules/InvoiceStatusBadge',
	component: InvoiceStatusBadge,
	tags: ['autodocs'],
	argTypes: {
		status: { control: 'select', options: ['draft', 'paid', 'void', 'overdue', 'pending'] },
		size: { control: 'select', options: ['sm', 'md'] },
	},
	args: { status: 'paid' },
};

export default meta;
type Story = StoryObj<typeof InvoiceStatusBadge>;

export const AllStatuses: Story = {
	render: () => (
		<div className='flex flex-col items-start gap-3'>
			{(['draft', 'paid', 'void', 'overdue', 'pending'] as const).map((status) => (
				<InvoiceStatusBadge key={status} status={status} />
			))}
		</div>
	),
};
