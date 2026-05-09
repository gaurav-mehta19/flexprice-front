import { useMemo, useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils';

export interface DateRange {
	from: Date;
	to: Date;
}

export interface DateRangePreset {
	label: string;
	getValue: () => DateRange;
}

export interface DateRangePickerProps {
	value?: DateRange;
	onChange?: (range: DateRange) => void;
	presets?: DateRangePreset[];
	disabled?: boolean;
}

const toInputValue = (date: Date) => date.toISOString().slice(0, 10);
const displayDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export const defaultDateRangePresets: DateRangePreset[] = [
	{ label: 'Last 7 days', getValue: () => ({ from: new Date(Date.now() - 6 * 86400000), to: new Date() }) },
	{ label: 'Last 30 days', getValue: () => ({ from: new Date(Date.now() - 29 * 86400000), to: new Date() }) },
	{ label: 'Last 90 days', getValue: () => ({ from: new Date(Date.now() - 89 * 86400000), to: new Date() }) },
	{ label: 'This month', getValue: () => ({ from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), to: new Date() }) },
	{
		label: 'Last month',
		getValue: () => ({
			from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
			to: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
		}),
	},
];

/**
 * DateRangePicker
 * @description Date range selector with preset options for analytics filtering.
 * @param value - { from: Date; to: Date }
 * @param onChange - Called with new date range
 * @param presets - Quick select options
 * @param disabled - Disable the picker
 */
export const DateRangePicker = ({ value, onChange, presets = defaultDateRangePresets, disabled = false }: DateRangePickerProps) => {
	const [open, setOpen] = useState(false);
	const initialValue = useMemo(() => {
		if (value) return value;
		// prefer second preset if present, fall back to first, otherwise use today
		const preset = presets[1] ?? presets[0];
		return preset?.getValue ? preset.getValue() : { from: new Date(), to: new Date() };
	}, [presets, value]);
	const [draft, setDraft] = useState<DateRange>(initialValue);

	// keep draft in sync when controlled `value` changes
	useMemo(() => {
		if (value) setDraft(value);
	}, [value]);

	const apply = (range: DateRange) => {
		setDraft(range);
		onChange?.(range);
	};

	return (
		<div className='relative inline-block w-80'>
			<Button
				type='button'
				variant='secondary'
				disabled={disabled}
				leftIcon={<Calendar className='h-4 w-4' />}
				onClick={() => setOpen((next) => !next)}
				className='w-full justify-start'>
				{displayDate(draft.from)} - {displayDate(draft.to)}
			</Button>
			{open && (
				<div className='absolute z-20 mt-2 w-full rounded-lg border bg-white p-3 shadow-lg'>
					<div className='space-y-1'>
						{presets.map((preset) => (
							<button
								key={preset.label}
								type='button'
								className='w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-50'
								onClick={() => {
									const next = preset.getValue ? preset.getValue() : undefined;
									if (next) apply(next);
								}}>
								{preset.label}
							</button>
						))}
					</div>
					<div className='mt-3 grid grid-cols-2 gap-2 border-t pt-3'>
						<input
							className={cn('rounded-md border px-2 py-1 text-sm')}
							type='date'
							value={toInputValue(draft.from)}
							onChange={(event) => apply({ ...draft, from: new Date(event.target.value) })}
						/>
						<input
							className={cn('rounded-md border px-2 py-1 text-sm')}
							type='date'
							value={toInputValue(draft.to)}
							onChange={(event) => apply({ ...draft, to: new Date(event.target.value) })}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
