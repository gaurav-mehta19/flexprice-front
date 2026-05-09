import type { Meta, StoryObj } from '@storybook/react';
import { AlertCircle, FileText, Search, Users } from 'lucide-react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
	title: 'Organisms/EmptyState',
	component: EmptyState,
	tags: ['autodocs'],
	argTypes: {
		icon: { control: false },
		title: { control: 'text' },
		description: { control: 'text' },
		action: { control: false },
		secondaryAction: { control: false },
		variant: { control: 'select', options: ['default', 'search', 'error'] },
		className: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoInvoices: Story = {
	args: {
		icon: <FileText className='h-6 w-6' />,
		title: 'No invoices yet',
		description: 'Create your first invoice to get started',
		action: { label: 'Create Invoice', onClick: () => undefined },
	},
};
export const NoCustomers: Story = {
	args: {
		icon: <Users className='h-6 w-6' />,
		title: 'No customers yet',
		description: 'Add your first customer to start billing',
		action: { label: 'Add Customer', onClick: () => undefined },
	},
};
export const SearchEmpty: Story = {
	args: {
		icon: <Search className='h-6 w-6' />,
		title: 'No results found',
		description: 'Try adjusting your search or filters',
		variant: 'search',
	},
};
export const Error: Story = {
	args: { icon: <AlertCircle className='h-6 w-6' />, title: 'Something went wrong', description: 'Try refreshing', variant: 'error' },
};
export const WithSecondaryAction: Story = {
	args: {
		icon: <FileText className='h-6 w-6' />,
		title: 'No invoices yet',
		description: 'Create an invoice or import existing records.',
		action: { label: 'Create Invoice', onClick: () => undefined },
		secondaryAction: { label: 'Import CSV', onClick: () => undefined },
	},
};
