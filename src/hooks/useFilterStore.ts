import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

function hashObject(obj: Record<string, unknown>): string {
	const str = JSON.stringify(obj);
	let hash = 5381;

	for (let i = 0; i < str.length; i++) {
		hash = (hash * 33) ^ str.charCodeAt(i);
	}

	return (hash >>> 0).toString(36);
}

function updateUrlFingerprint(_routeKey: string, filters: Record<string, unknown>) {
	if (typeof window === 'undefined') return;

	const url = new URL(window.location.href);
	const filterCount = Object.keys(filters).filter((key) => filters[key] !== undefined && filters[key] !== '').length;

	if (filterCount > 0) {
		const newF = hashObject(filters);
		const currentF = url.searchParams.get('_f');
		if (currentF !== newF) {
			url.searchParams.set('_f', newF);
			url.searchParams.set('_fc', String(filterCount));
		} else {
			// only update count if it changed
			const currentFc = url.searchParams.get('_fc');
			if (currentFc !== String(filterCount)) url.searchParams.set('_fc', String(filterCount));
		}
	} else {
		url.searchParams.delete('_f');
		url.searchParams.delete('_fc');
	}

	const newUrl = url.toString();
	if (newUrl !== window.location.href) {
		window.history.replaceState(null, '', newUrl);
	}
}

interface FilterStore {
	filters: Record<string, Record<string, unknown>>;
	setFilter: (routeKey: string, key: string, value: unknown) => void;
	resetFilters: (routeKey: string) => void;
	getFilters: (routeKey: string) => Record<string, unknown>;
}

export const useFilterStore = create<FilterStore>()(
	persist(
		(set, get) => ({
			filters: {},
			setFilter: (routeKey, key, value) => {
				set((state) => {
					const current = state.filters[routeKey]?.[key];
					if (current === value) return state; // no change
					const updated = { ...state.filters[routeKey], [key]: value };
					const newFilters = { ...state.filters, [routeKey]: updated };
					updateUrlFingerprint(routeKey, updated);
					return { filters: newFilters };
				});
			},
			resetFilters: (routeKey) => {
				set((state) => {
					const current = state.filters[routeKey];
					if (!current || Object.keys(current).length === 0) return state; // already empty
					const newFilters = { ...state.filters, [routeKey]: {} };
					updateUrlFingerprint(routeKey, {});
					return { filters: newFilters };
				});
			},
			getFilters: (routeKey) => get().filters[routeKey] ?? {},
		}),
		{
			name: 'flexprice-filters',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
