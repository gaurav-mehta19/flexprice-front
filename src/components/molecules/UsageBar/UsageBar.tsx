import { cn } from '@/lib/utils';

export interface UsageBarProps {
	label: string;
	used: number;
	total: number;
	unit?: string;
	showNumbers?: boolean;
	loading?: boolean;
	className?: string;
}

/**
 * UsageBar / MeterProgress
 * @description Labelled progress bar showing consumed vs. entitled usage.
 * @param label - Meter name
 * @param used - Units consumed
 * @param total - Total entitled units
 * @param unit - Unit label (e.g. 'API calls', 'GB')
 * @param showNumbers - Display used/total numbers
 * @param loading - Show skeleton
 */
export const UsageBar = ({ label, used, total, unit = 'units', showNumbers = true, loading = false, className }: UsageBarProps) => {
	if (loading) {
		return (
			<div className={cn('animate-pulse space-y-2', className)}>
				<div className='h-4 w-40 rounded bg-gray-200' />
				<div className='h-2 w-full rounded bg-gray-200' />
			</div>
		);
	}

	const percentage = total > 0 ? Math.min(100, (used / total) * 100) : 0;
	const color = percentage >= 90 ? 'bg-red-500' : percentage >= 70 ? 'bg-yellow-500' : 'bg-green-500';

	return (
		<div className={cn('space-y-2', className)}>
			<div className='flex items-center justify-between gap-4'>
				<p className='text-sm font-medium text-gray-900'>{label}</p>
				{showNumbers && (
					<p className='text-sm text-gray-500'>
						{used.toLocaleString()} / {total.toLocaleString()} {unit}
					</p>
				)}
			</div>
			<div className='h-2 overflow-hidden rounded-full bg-gray-100'>
				<div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${percentage}%` }} />
			</div>
		</div>
	);
};
