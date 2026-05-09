import type React from 'react';
import { cn } from '@/lib/utils';
import { STATUS_MAP } from '@/lib/statusMaps';
import { formatStatus } from '@/lib/formatters';

export interface BadgeProps {
	status: string;
	size?: 'sm' | 'md';
	dot?: boolean;
	label?: React.ReactNode;
	className?: string;
}

const fallbackStatus = {
	label: 'Unknown',
	color: 'text-gray-700',
	bgColor: 'bg-gray-100',
	dotColor: 'bg-gray-400',
};

/**
 * Badge / StatusChip
 * @description Displays a status or category label with semantic color coding.
 * @param status - The status string (maps via STATUS_MAP)
 * @param size - 'sm' | 'md'
 * @param dot - Show a colored dot indicator before the label
 * @param label - Override the auto-derived label from status
 */
export const Badge = ({ status, size = 'md', dot = false, label, className }: BadgeProps) => {
	const config = STATUS_MAP[status] ?? { ...fallbackStatus, label: formatStatus(status) };

	return (
		<span
			className={cn(
				'inline-flex items-center gap-1.5 rounded-full font-medium',
				size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-0.5 text-xs',
				config.bgColor,
				config.color,
				className,
			)}>
			{dot && <span aria-hidden='true' className={cn('h-1.5 w-1.5 rounded-full', config.dotColor)} />}
			{label ?? config.label}
		</span>
	);
};
