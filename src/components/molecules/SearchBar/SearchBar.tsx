import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/atoms/Spinner';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	debounceMs?: number;
	loading?: boolean;
	onClear?: () => void;
	className?: string;
}

/**
 * SearchBar
 * @description Search input with internal debounce and clear button.
 * @param value - Controlled value
 * @param onChange - Called with debounced value
 * @param placeholder - Input placeholder
 * @param debounceMs - Debounce delay in ms (default: 300)
 * @param loading - Show spinner inside input
 * @param onClear - Called when clear button clicked
 */
export const SearchBar = ({
	value = '',
	onChange,
	placeholder = 'Search...',
	debounceMs = 300,
	loading = false,
	onClear,
	className,
}: SearchBarProps) => {
	const [localValue, setLocalValue] = useState(value);

	useEffect(() => setLocalValue(value), [value]);

	useEffect(() => {
		// Only emit when localValue differs from controlled value to avoid echo loops
		if (onChange && localValue !== value) {
			const timeout = window.setTimeout(() => onChange(localValue), debounceMs);
			return () => window.clearTimeout(timeout);
		}
		return;
	}, [debounceMs, localValue, onChange]);

	const clear = () => {
		setLocalValue('');
		onChange?.('');
		onClear?.();
	};

	return (
		<div className={cn('relative w-full', className)}>
			<Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
			<input
				className='h-10 w-full rounded-md border border-input bg-background py-2 pl-9 pr-10 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring'
				placeholder={placeholder}
				value={localValue}
				onChange={(event) => setLocalValue(event.target.value)}
			/>
			<div className='absolute right-3 top-1/2 flex -translate-y-1/2 items-center'>
				{loading ? (
					<Spinner size='sm' />
				) : localValue ? (
					<button type='button' aria-label='Clear search' className='rounded p-0.5 text-gray-400 hover:text-gray-700' onClick={clear}>
						<X className='h-4 w-4' />
					</button>
				) : null}
			</div>
		</div>
	);
};
