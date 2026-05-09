export const mockTieredPlan = {
	name: 'API Calls - Tiered',
	billingModel: 'tiered' as const,
	currency: 'USD',
	tiers: [
		{ from: 0, to: 10000, unitPrice: 0.001, flatFee: 0, description: 'First 10k calls' },
		{ from: 10001, to: 100000, unitPrice: 0.0008, flatFee: 10, description: 'Next 90k calls' },
		{ from: 100001, to: null, unitPrice: 0.0005, flatFee: 80, description: 'Beyond 100k' },
	],
};

export const mockGraduatedPlan = {
	name: 'Storage - Graduated',
	billingModel: 'graduated' as const,
	currency: 'USD',
	tiers: [
		{ from: 0, to: 100, unitPrice: 0.05, flatFee: 0, description: 'First 100 GB' },
		{ from: 101, to: 1000, unitPrice: 0.03, flatFee: 5, description: 'Next 900 GB' },
		{ from: 1001, to: null, unitPrice: 0.01, flatFee: 30, description: 'Beyond 1 TB' },
	],
};
