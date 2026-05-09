export function formatCurrency(amount: number, currency = 'USD'): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount);
}

export function formatStatus(status: string): string {
	return status
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
}

export function calculateTieredPrice(
	tiers: Array<{ from: number; to: number | null; unitPrice: number; flatFee?: number }>,
	quantity: number,
): number {
	if (quantity <= 0) return 0;

	return tiers.reduce((total, tier) => {
		if (quantity < tier.from) return total;

		const tierEnd = tier.to ?? quantity;
		const tierStartBoundary = tier.from === 0 ? 0 : tier.from - 1;
		const unitsInTier = Math.max(0, Math.min(quantity, tierEnd) - tierStartBoundary);

		if (unitsInTier === 0) return total;

		return total + unitsInTier * tier.unitPrice + (tier.flatFee ?? 0);
	}, 0);
}
