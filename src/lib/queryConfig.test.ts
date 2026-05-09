import { describe, expect, it } from 'vitest';
import { createQueryConfig, QUERY_PRESETS } from './queryConfig';

describe('createQueryConfig', () => {
	it('uses default preset', () => {
		const queryFn = async () => 'ok';
		const config = createQueryConfig(['test'], queryFn);

		expect(config.queryKey).toEqual(['test']);
		expect(config.queryFn).toBe(queryFn);
		expect(config.staleTime).toBe(QUERY_PRESETS.DEFAULT.staleTime);
	});

	it('applies selected preset and overrides', () => {
		const config = createQueryConfig(['static'], async () => 1, {
			preset: 'STATIC',
			enabled: false,
		});

		expect(config.staleTime).toBe(QUERY_PRESETS.STATIC.staleTime);
		expect(config.enabled).toBe(false);
	});
});
