export const STATUS_MAP: Record<string, { label: string; color: string; bgColor: string; dotColor: string }> = {
	active: { label: 'Active', color: 'text-green-700', bgColor: 'bg-green-50', dotColor: 'bg-green-500' },
	paid: { label: 'Paid', color: 'text-green-700', bgColor: 'bg-green-50', dotColor: 'bg-green-500' },
	draft: { label: 'Draft', color: 'text-gray-600', bgColor: 'bg-gray-100', dotColor: 'bg-gray-400' },
	archived: { label: 'Archived', color: 'text-yellow-700', bgColor: 'bg-yellow-50', dotColor: 'bg-yellow-500' },
	cancelled: { label: 'Cancelled', color: 'text-yellow-700', bgColor: 'bg-yellow-50', dotColor: 'bg-yellow-500' },
	void: { label: 'Void', color: 'text-red-700', bgColor: 'bg-red-50', dotColor: 'bg-red-500' },
	overdue: { label: 'Overdue', color: 'text-red-700', bgColor: 'bg-red-50', dotColor: 'bg-red-500' },
	pending: { label: 'Pending', color: 'text-orange-700', bgColor: 'bg-orange-50', dotColor: 'bg-orange-500' },
	trialing: { label: 'Trialing', color: 'text-blue-700', bgColor: 'bg-blue-50', dotColor: 'bg-blue-500' },
};
