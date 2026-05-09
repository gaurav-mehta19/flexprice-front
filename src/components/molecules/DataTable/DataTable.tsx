import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '@/lib/utils';

export interface ColumnDef<T> {
	key: string;
	header: string;
	accessor: keyof T | ((row: T) => React.ReactNode);
	sortable?: boolean;
	width?: string;
	cell?: (value: unknown, row: T) => React.ReactNode;
}

export interface PaginationConfig {
	page: number;
	pageSize: number;
	total: number;
	onPageChange: (page: number) => void;
}

export interface SortingConfig {
	column: string;
	direction: 'asc' | 'desc';
	onSort: (column: string) => void;
}

export interface DataTableProps<T extends Record<string, unknown>> {
	columns: ColumnDef<T>[];
	data: T[];
	loading?: boolean;
	emptyState?: React.ReactNode;
	pagination?: PaginationConfig;
	sorting?: SortingConfig;
	virtualized?: boolean;
	rowHeight?: number;
	onRowClick?: (row: T) => void;
	className?: string;
}

const getValue = <T extends Record<string, unknown>>(row: T, column: ColumnDef<T>) =>
	typeof column.accessor === 'function' ? column.accessor(row) : row[column.accessor];

/**
 * DataTable
 * @description Flexible data table with sorting, pagination, loading skeleton, empty state, and optional row virtualisation.
 * @param columns - Column definitions
 * @param data - Array of row data
 * @param loading - Show skeleton rows
 * @param emptyState - Custom empty state node
 * @param pagination - Pagination configuration
 * @param sorting - Sorting configuration
 * @param virtualized - Enable @tanstack/react-virtual for large datasets
 * @param rowHeight - Estimated row height for virtualiser (default: 52)
 * @param onRowClick - Row click handler
 */
export const DataTable = <T extends Record<string, unknown>>({
	columns,
	data,
	loading = false,
	emptyState,
	pagination,
	sorting,
	virtualized = false,
	rowHeight = 52,
	onRowClick,
	className,
}: DataTableProps<T>) => {
	const parentRef = useRef<HTMLDivElement>(null);
	const rowVirtualizer = useVirtualizer({
		count: data.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => rowHeight,
		overscan: 10,
	});

	const renderHeader = () => (
		<thead className='bg-gray-50'>
			<tr>
				{columns.map((column) => (
					<th
						key={column.key}
						className='border-b px-4 py-3 text-left text-xs font-semibold uppercase tracking-normal text-gray-500'
						style={{ width: column.width }}>
						<button
							type='button'
							className={cn('inline-flex items-center gap-1', column.sortable && 'hover:text-gray-900')}
							disabled={!column.sortable}
							onClick={() => column.sortable && sorting?.onSort(column.key)}>
							{column.header}
							{column.sortable && sorting?.column === column.key && <span>{sorting.direction === 'asc' ? '↑' : '↓'}</span>}
						</button>
					</th>
				))}
			</tr>
		</thead>
	);

	const renderCell = (row: T, column: ColumnDef<T>) => {
		const value = getValue(row, column);
		return column.cell ? column.cell(value, row) : (value as React.ReactNode);
	};

	if (loading) {
		return (
			<div className={cn('overflow-hidden rounded-lg border bg-white', className)}>
				<table className='w-full table-fixed'>
					{renderHeader()}
					<tbody>
						{Array.from({ length: 5 }).map((_, rowIndex) => (
							<tr key={rowIndex}>
								{columns.map((column) => (
									<td key={column.key} className='border-b px-4 py-4'>
										<div className='h-4 animate-pulse rounded bg-gray-200' />
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}

	if (data.length === 0) {
		return (
			<div className={cn('flex min-h-48 items-center justify-center rounded-lg border bg-white text-sm text-gray-500', className)}>
				{emptyState ?? 'No data'}
			</div>
		);
	}

	const pageCount = pagination ? Math.max(1, Math.ceil(pagination.total / pagination.pageSize)) : 1;

	return (
		<div className={cn('overflow-hidden rounded-lg border bg-white', className)}>
			{virtualized ? (
				<div ref={parentRef} className='h-full max-h-[600px] overflow-auto'>
					<table className='w-full table-fixed'>{renderHeader()}</table>
					<div className='relative' style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
						{rowVirtualizer.getVirtualItems().map((virtualRow) => {
							const row = data[virtualRow.index];
							return (
								<div
									key={virtualRow.key}
									className={cn('absolute left-0 top-0 grid w-full border-b bg-white hover:bg-gray-50', onRowClick && 'cursor-pointer')}
									style={{
										height: `${virtualRow.size}px`,
										transform: `translateY(${virtualRow.start}px)`,
										gridTemplateColumns: columns.map((column) => column.width ?? '1fr').join(' '),
									}}
									onClick={() => onRowClick?.(row)}>
									{columns.map((column) => (
										<div key={column.key} className='flex items-center px-4 py-3 text-sm text-gray-700'>
											{renderCell(row, column)}
										</div>
									))}
								</div>
							);
						})}
					</div>
				</div>
			) : (
				<table className='w-full table-fixed'>
					{renderHeader()}
					<tbody>
						{data.map((row, rowIndex) => (
							<tr
								key={String(row.id ?? rowIndex)}
								className={cn('hover:bg-gray-50', onRowClick && 'cursor-pointer')}
								onClick={() => onRowClick?.(row)}>
								{columns.map((column) => (
									<td key={column.key} className='border-b px-4 py-3 text-sm text-gray-700'>
										{renderCell(row, column)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			)}
			{pagination && (
				<div className='flex items-center justify-between border-t px-4 py-3 text-sm text-gray-600'>
					<span>
						Page {pagination.page} of {pageCount}
					</span>
					<div className='flex gap-2'>
						<button
							className='rounded border px-3 py-1 disabled:opacity-50'
							disabled={pagination.page <= 1}
							onClick={() => pagination.onPageChange(pagination.page - 1)}>
							Previous
						</button>
						<button
							className='rounded border px-3 py-1 disabled:opacity-50'
							disabled={pagination.page >= pageCount}
							onClick={() => pagination.onPageChange(pagination.page + 1)}>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
