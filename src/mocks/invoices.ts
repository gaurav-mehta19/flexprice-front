export const mockInvoices = Array.from({ length: 50 }, (_, i) => ({
	id: `inv_${String(i).padStart(6, '0')}`,
	customer: `Customer ${i + 1}`,
	amount: parseFloat((Math.random() * 5000 + 100).toFixed(2)),
	currency: 'USD',
	status: ['paid', 'draft', 'void', 'overdue', 'pending'][i % 5] as string,
	date: new Date(Date.now() - i * 3 * 86400000).toISOString(),
	dueDate: new Date(Date.now() + (30 - i) * 86400000).toISOString(),
}));
