import { beforeEach, describe, expect, it } from 'vitest';
import { useFilterStore } from './useFilterStore';

describe('useFilterStore', () => {
	beforeEach(() => {
		sessionStorage.clear();
		useFilterStore.setState({ filters: {} });
		window.history.replaceState(null, '', '/');
	});

	it('sets and reads route scoped filters', () => {
		useFilterStore.getState().setFilter('filters:invoices', 'status', 'paid');

		expect(useFilterStore.getState().getFilters('filters:invoices')).toEqual({ status: 'paid' });
		expect(new URL(window.location.href).searchParams.get('_fc')).toBe('1');
	});

	it('resets filters and clears url fingerprint', () => {
		useFilterStore.getState().setFilter('filters:invoices', 'status', 'paid');
		useFilterStore.getState().resetFilters('filters:invoices');

		expect(useFilterStore.getState().getFilters('filters:invoices')).toEqual({});
		expect(new URL(window.location.href).searchParams.get('_f')).toBeNull();
	});
});
