import type { Meta, StoryObj } from '@storybook/react';
import { AlertCircle, FileText, Search, Users } from 'lucide-react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
	title: 'Organisms/EmptyState',
	component: EmptyState,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				story:
					'Default shows the standard empty page pattern. Variants demonstrate search, error, and action-focused states. Controls let reviewers swap the message content and visual tone.',
			},
		},
	},
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

export const Default: Story = {
	args: {
		icon: <FileText className='h-6 w-6' />,
		title: 'No invoices yet',
		description: 'Create your first invoice to get started',
		action: { label: 'Create Invoice', onClick: () => undefined },
	},
};

export const Controls: Story = {
	args: {
		icon: <FileText className='h-6 w-6' />,
		title: 'No invoices yet',
		description: 'Create your first invoice to get started',
		action: { label: 'Create Invoice', onClick: () => undefined },
	},
};

export const Variants: Story = {
	render: () => (
		<div className='grid gap-4'>
			<EmptyState
				icon={<FileText className='h-6 w-6' />}
				title='No invoices yet'
				description='Create your first invoice to get started'
				action={{ label: 'Create Invoice', onClick: () => undefined }}
			/>
			<EmptyState
				icon={<Users className='h-6 w-6' />}
				title='No customers yet'
				description='Add your first customer to start billing'
				action={{ label: 'Add Customer', onClick: () => undefined }}
			/>
			<EmptyState
				icon={<Search className='h-6 w-6' />}
				title='No results found'
				description='Try adjusting your search or filters'
				variant='search'
			/>
		</div>
	),
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
