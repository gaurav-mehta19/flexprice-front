import { AlertCircle, CheckCircle2, Clock, FileText, XCircle } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';

export interface InvoiceStatusBadgeProps {
	status: 'draft' | 'paid' | 'void' | 'overdue' | 'pending';
	size?: 'sm' | 'md';
}

const icons = {
	paid: CheckCircle2,
	draft: FileText,
	void: XCircle,
	overdue: AlertCircle,
	pending: Clock,
};

/**
 * InvoiceStatusBadge
 * @description Semantic badge specifically for invoice status values, with icons.
 * @param status - Invoice status: 'draft' | 'paid' | 'void' | 'overdue' | 'pending'
 */
export const InvoiceStatusBadge = ({ status, size = 'md' }: InvoiceStatusBadgeProps) => {
	const Icon = icons[status];

	return (
		<Badge
			status={status}
			size={size}
			label={
				<span className='inline-flex items-center gap-1'>
					<Icon className='h-3.5 w-3.5' />
					<span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
				</span>
			}
		/>
	);
};
