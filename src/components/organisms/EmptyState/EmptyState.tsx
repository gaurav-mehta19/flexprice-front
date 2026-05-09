import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils';

export interface EmptyStateAction {
	label: string;
	onClick: () => void;
}

export interface EmptyStateProps {
	icon?: React.ReactNode;
	title: string;
	description?: string;
	action?: EmptyStateAction;
	secondaryAction?: EmptyStateAction;
	variant?: 'default' | 'search' | 'error';
	className?: string;
}

/**
 * EmptyState
 * @description Full-area empty state with icon, headline, description, and optional CTA.
 * @param icon - Icon element to display
 * @param title - Main headline
 * @param description - Supporting text
 * @param action - Primary CTA button config
 * @param secondaryAction - Secondary action link/button
 * @param variant - Visual variant
 */
export const EmptyState = ({ icon, title, description, action, secondaryAction, variant = 'default', className }: EmptyStateProps) => (
	<div className={cn('flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center', className)}>
		{icon && (
			<div className={cn('mb-4 rounded-full p-4', variant === 'error' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500')}>
				{icon}
			</div>
		)}
		<h3 className='text-lg font-semibold text-gray-950'>{title}</h3>
		{description && <p className='mt-2 max-w-md text-sm text-gray-500'>{description}</p>}
		<div className='mt-6 flex items-center gap-3'>
			{action && <Button onClick={action.onClick}>{action.label}</Button>}
			{secondaryAction && (
				<Button variant='ghost' onClick={secondaryAction.onClick}>
					{secondaryAction.label}
				</Button>
			)}
		</div>
	</div>
);
