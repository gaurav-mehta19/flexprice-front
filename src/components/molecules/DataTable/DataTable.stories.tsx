import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/atoms/Badge';
import Select from '@/components/atoms/Select/Select';
import { SearchBar } from '@/components/molecules/SearchBar';
import { mockCustomers10k } from '@/mocks/customers';
import { mockInvoices } from '@/mocks/invoices';
import { formatCurrency } from '@/lib/formatters';
import { useFilterStore } from '@/hooks/useFilterStore';
import { ColumnDef, DataTable } from './DataTable';

type InvoiceRow = (typeof mockInvoices)[number] & Record<string, unknown>;
type CustomerRow = (typeof mockCustomers10k)[number] & Record<string, unknown>;

const invoiceColumns: ColumnDef<InvoiceRow>[] = [
	{ key: 'id', header: 'Invoice', accessor: 'id', sortable: true },
	{ key: 'customer', header: 'Customer', accessor: 'customer', sortable: true },
	{ key: 'amount', header: 'Amount', accessor: 'amount', cell: (value, row) => formatCurrency(Number(value), String(row.currency)) },
	{ key: 'status', header: 'Status', accessor: 'status', cell: (value) => <Badge status={String(value)} dot /> },
	{ key: 'date', header: 'Date', accessor: 'date', cell: (value) => new Date(String(value)).toLocaleDateString() },
];

const customerColumns: ColumnDef<CustomerRow>[] = [
	{ key: 'id', header: 'ID', accessor: 'id', width: '160px' },
	{ key: 'name', header: 'Name', accessor: 'name' },
	{ key: 'email', header: 'Email', accessor: 'email' },
	{ key: 'plan', header: 'Plan', accessor: 'plan' },
	{ key: 'mrr', header: 'MRR', accessor: 'mrr', cell: (value) => formatCurrency(Number(value)) },
];

const meta: Meta<typeof DataTable<InvoiceRow>> = {
	title: 'Molecules/DataTable',
	component: DataTable<InvoiceRow>,
	tags: ['autodocs'],
	argTypes: {
		columns: { control: false },
		data: { control: false },
		loading: { control: 'boolean' },
		emptyState: { control: false },
		pagination: { control: false },
		sorting: { control: false },
		virtualized: { control: 'boolean' },
		rowHeight: { control: 'number' },
		onRowClick: { action: 'row clicked' },
		className: { control: 'text' },
	},
	args: {
		columns: invoiceColumns,
		data: mockInvoices.slice(0, 20) as InvoiceRow[],
	},
};

export default meta;
type Story = StoryObj<typeof DataTable<InvoiceRow>>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
export const Empty: Story = { args: { data: [], emptyState: <div>No invoices yet</div> } };

const WithSortingStory = () => {
	const [sorting, setSorting] = useState<{ column: string; direction: 'asc' | 'desc' }>({ column: 'id', direction: 'asc' });
	const sorted = useMemo(() => {
		return [...mockInvoices].sort((a, b) => {
			const aValue = String(a[sorting.column as keyof typeof a]);
			const bValue = String(b[sorting.column as keyof typeof b]);
			return sorting.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
		}) as InvoiceRow[];
	}, [sorting]);
	return (
		<DataTable
			columns={useMemo(() => invoiceColumns.map((column) => ({ ...column, sortable: true })), [])}
			data={sorted.slice(0, 20)}
			sorting={{
				...sorting,
				onSort: (column) => setSorting((current) => ({ column, direction: current.direction === 'asc' ? 'desc' : 'asc' })),
			}}
		/>
	);
};

export const WithSorting: Story = {
	render: () => <WithSortingStory />,
};

const WithPaginationStory = () => {
	const [page, setPage] = useState(1);
	const pageSize = 10;
	const pageData = mockInvoices.slice((page - 1) * pageSize, page * pageSize) as InvoiceRow[];

	return (
		<DataTable
			columns={invoiceColumns}
			data={pageData}
			pagination={{ page, pageSize, total: mockInvoices.length, onPageChange: setPage }}
		/>
	);
};

export const WithPagination: Story = {
	render: () => <WithPaginationStory />,
};

const EMPTY_FILTERS: Record<string, unknown> = {};

const WithFilterStoreStory = () => {
	const routeKey = 'filters:invoices';
	const filters = useFilterStore((state) => state.filters[routeKey] ?? EMPTY_FILTERS);
	const setFilter = useFilterStore((state) => state.setFilter);
	const resetFilters = useFilterStore((state) => state.resetFilters);
	const activeCount = Object.values(filters).filter((value) => value !== undefined && value !== '').length;
	const fingerprint = new URL(window.location.href).searchParams.get('_f') ?? 'none';
	const filteredInvoices = useMemo(() => {
		return mockInvoices.filter((invoice) => {
			const search = String(filters.search ?? '').toLowerCase();
			const status = String(filters.status ?? '');
			return (
				(!search || invoice.customer.toLowerCase().includes(search) || invoice.id.includes(search)) &&
				(!status || invoice.status === status)
			);
		}) as InvoiceRow[];
	}, [filters]);

	const statusOptions = useMemo(
		() => [
			{ value: 'paid', label: 'Paid' },
			{ value: 'draft', label: 'Draft' },
			{ value: 'void', label: 'Void' },
			{ value: 'overdue', label: 'Overdue' },
			{ value: 'pending', label: 'Pending' },
		],
		[],
	);

	return (
		<div className='space-y-4'>
			<div className='flex items-center gap-3'>
				<SearchBar className='max-w-xs' value={String(filters.search ?? '')} onChange={(value) => setFilter(routeKey, 'search', value)} />
				{/** memoize options to avoid recreating objects on each render */}
				<Select
					className='w-48'
					placeholder='Status'
					value={String(filters.status ?? '')}
					onChange={(value) => setFilter(routeKey, 'status', value)}
					options={statusOptions}
				/>
				<Badge status='active' label={`${activeCount} active filters | fingerprint: ${fingerprint}`} />
				<button className='rounded-md border px-3 py-2 text-sm' onClick={() => resetFilters(routeKey)}>
					Reset
				</button>
			</div>
			<DataTable columns={invoiceColumns} data={filteredInvoices} />
		</div>
	);
};

export const WithFilterStore: Story = {
	render: () => <WithFilterStoreStory />,
};

export const Virtualized: StoryObj<typeof DataTable<CustomerRow>> = {
	name: 'Virtualized (10,000 rows)',
	parameters: {
		docs: {
			description: {
				story:
					'Demonstrates row virtualisation using @tanstack/react-virtual. Only rows in the viewport are rendered. Scroll performance is maintained even with 10,000 rows.',
			},
		},
		sandboxHeight: 600,
	},
	render: () => <DataTable columns={customerColumns} data={mockCustomers10k as CustomerRow[]} virtualized={true} rowHeight={52} />,
};
