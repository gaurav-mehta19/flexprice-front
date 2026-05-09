import type { UseQueryOptions } from '@tanstack/react-query';

export const QUERY_PRESETS = {
	REALTIME: { staleTime: 0, gcTime: 1 * 60 * 1000 },
	DEFAULT: { staleTime: 5 * 60 * 1000, gcTime: 10 * 60 * 1000 },
	STATIC: { staleTime: 30 * 60 * 1000, gcTime: 60 * 60 * 1000 },
} as const;

type QueryPreset = keyof typeof QUERY_PRESETS;

export function createQueryConfig<T>(
	queryKey: unknown[],
	queryFn: () => Promise<T>,
	options?: Partial<UseQueryOptions<T>> & { preset?: QueryPreset },
): UseQueryOptions<T> {
	const preset = options?.preset ?? 'DEFAULT';
	const presetConfig = QUERY_PRESETS[preset];
	const { preset: _preset, ...restOptions } = options ?? {};

	return { queryKey, queryFn, ...presetConfig, ...restOptions };
}
