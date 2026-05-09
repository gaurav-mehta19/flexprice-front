export const generateCustomers = (count: number) =>
	Array.from({ length: count }, (_, i) => ({
		id: `cust_${String(i).padStart(6, '0')}`,
		name: `Customer ${i + 1}`,
		email: `customer${i + 1}@example.com`,
		plan: ['Starter', 'Growth', 'Enterprise'][i % 3],
		status: ['active', 'cancelled', 'trialing'][i % 3] as string,
		mrr: parseFloat((Math.random() * 500).toFixed(2)),
		createdAt: new Date(Date.now() - i * 86400000).toISOString(),
	}));

export const mockCustomers = generateCustomers(50);
export const mockCustomers10k = generateCustomers(10000);
