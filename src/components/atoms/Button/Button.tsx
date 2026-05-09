import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Spinner } from '../Spinner';

const buttonVariants = cva(
	'inline-flex !py-0 !my-0 items-center justify-center gap-2 whitespace-nowrap rounded-[7px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: 'bg-[#092E44] text-white shadow hover:opacity-90 border-[#092E44]',
				primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
				black: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-8 p-[10px] !py-[15px] !px-[12px] border  rounded-[7px]',
				sm: 'h-8 rounded-[7px] px-3 text-xs',
				md: 'h-9 rounded-[7px] px-4 text-sm',
				lg: 'h-10 rounded-[7px] px-3',
				icon: 'h-9 w-9',
				xs: 'h-6 rounded-[7px] px-3 text-xs',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	isLoading?: boolean;
	loading?: boolean;
	suffixIcon?: ReactNode;
	prefixIcon?: ReactNode;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

/**
 * Button
 * @description Primary interactive element. Supports multiple variants, sizes, and states.
 * @param variant - Visual style: 'primary' | 'secondary' | 'ghost' | 'danger'
 * @param size - Size: 'sm' | 'md' | 'lg'
 * @param loading - Shows spinner and disables interaction
 * @param disabled - Disables the button
 * @param leftIcon - Icon element to render before label
 * @param rightIcon - Icon element to render after label
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			isLoading = false,
			loading = false,
			children,
			suffixIcon,
			prefixIcon,
			leftIcon,
			rightIcon,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';
		const isBusy = isLoading || loading;

		return (
			<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={isBusy || props.disabled} {...props}>
				{isBusy ? (
					<Spinner size='sm' />
				) : (
					<div className='flex items-center gap-[5px]'>
						{leftIcon ?? prefixIcon}
						{children}
						{rightIcon ?? suffixIcon}
					</div>
				)}
			</Comp>
		);
	},
);
Button.displayName = 'Button';

export default Button;
