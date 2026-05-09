import { describe, it, expect } from 'vitest';
import { formatCurrency, formatStatus, calculateTieredPrice } from './formatters';

describe('formatCurrency', () => {
	it('formats USD correctly', () => {
		expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
	});
	it('formats zero correctly', () => {
		expect(formatCurrency(0, 'USD')).toBe('$0.00');
	});
	it('handles large numbers', () => {
		expect(formatCurrency(1000000, 'USD')).toBe('$1,000,000.00');
	});
});

describe('formatStatus', () => {
	it('capitalizes single word', () => expect(formatStatus('active')).toBe('Active'));
	it('handles underscored status', () => expect(formatStatus('past_due')).toBe('Past Due'));
	it('handles already capitalized', () => expect(formatStatus('Draft')).toBe('Draft'));
});

describe('calculateTieredPrice', () => {
	const tiers = [
		{ from: 0, to: 1000, unitPrice: 0.01, flatFee: 0 },
		{ from: 1001, to: null, unitPrice: 0.005, flatFee: 10 },
	];
	it('calculates within first tier', () => {
		expect(calculateTieredPrice(tiers, 500)).toBeCloseTo(5.0);
	});
	it('calculates spanning two tiers', () => {
		expect(calculateTieredPrice(tiers, 1500)).toBeCloseTo(22.5);
	});
});
