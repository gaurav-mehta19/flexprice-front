import React from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps {
	size?: 'sm' | 'md' | 'lg' | 'xl' | number;
	fullPage?: boolean;
	text?: string;
	className?: string;
}

const sizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
	sm: 'h-4 w-4',
	md: 'h-6 w-6',
	lg: 'h-9 w-9',
	xl: 'h-12 w-12',
};

/**
 * Spinner
 * @description Animated loading indicator.
 * @param size - 'sm' (16px) | 'md' (24px) | 'lg' (36px) | 'xl' (48px)
 * @param fullPage - Centers spinner in a full-screen overlay
 * @param text - Optional label rendered below the spinner
 */
export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', fullPage = false, text, className }) => {
	const numericSizeClass =
		typeof size === 'number' ? (size <= 16 ? 'h-4 w-4' : size <= 24 ? 'h-6 w-6' : size <= 36 ? 'h-9 w-9' : 'h-12 w-12') : sizeClasses[size];

	const spinner = (
		<div className='flex flex-col items-center justify-center gap-3'>
			<svg
				className={cn('animate-spin text-current', numericSizeClass, className)}
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'>
				<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
				<path
					className='opacity-75'
					fill='currentColor'
					d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
				/>
			</svg>
			{text && <p className='text-sm text-muted-foreground'>{text}</p>}
		</div>
	);

	if (fullPage) {
		return <div className='fixed inset-0 z-50 flex items-center justify-center bg-background/80'>{spinner}</div>;
	}

	return spinner;
};

export default Spinner;
