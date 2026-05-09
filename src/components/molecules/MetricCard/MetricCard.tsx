import { cn } from '@/lib/utils';

export interface MetricCardProps {
	label: string;
	value: number | string;
	trend?: number;
	trendLabel?: string;
	prefix?: string;
	suffix?: string;
	loading?: boolean;
	className?: string;
}

/**
 * MetricCard
 * @description KPI summary card showing a metric value with optional trend indicator.
 * @param label - Metric name
 * @param value - Numeric value to display
 * @param trend - Percentage change (positive = green arrow up, negative = red arrow down)
 * @param trendLabel - Context for the trend (e.g. 'vs last month')
 * @param prefix - Prepended to value (e.g. '$')
 * @param suffix - Appended to value (e.g. '%')
 * @param loading - Show skeleton placeholder
 */
export const MetricCard = ({ label, value, trend, trendLabel, prefix = '', suffix = '', loading = false, className }: MetricCardProps) => {
	if (loading) {
		return (
			<div className={cn('rounded-lg border bg-white p-6 shadow-sm', className)}>
				<div className='animate-pulse space-y-4'>
					<div className='h-4 w-32 rounded bg-gray-200' />
					<div className='h-8 w-24 rounded bg-gray-200' />
					<div className='h-4 w-40 rounded bg-gray-200' />
				</div>
			</div>
		);
	}

	const trendIsPositive = (trend ?? 0) >= 0;

	return (
		<div className={cn('rounded-lg border bg-white p-6 shadow-sm', className)}>
			<p className='text-sm font-medium text-gray-500'>{label}</p>
			<p className='mt-2 text-3xl font-semibold tracking-normal text-gray-950'>
				{prefix}
				{typeof value === 'number' ? value.toLocaleString() : value}
				{suffix}
			</p>
			{trend !== undefined && (
				<p className={cn('mt-3 text-sm font-medium', trendIsPositive ? 'text-green-700' : 'text-red-700')}>
					{trendIsPositive ? '↑' : '↓'} {Math.abs(trend)}% {trendLabel}
				</p>
			)}
		</div>
	);
};

export default MetricCard;
