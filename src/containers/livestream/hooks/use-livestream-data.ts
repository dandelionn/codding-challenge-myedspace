import { useQuery } from '@tanstack/react-query';
import { getLivestreamCurrentOptions } from '@/api/generated/@tanstack/react-query.gen';

type UseLivestreamDataOptions = {
	enabled?: boolean;
};

export function useLivestreamData({ enabled = true }: UseLivestreamDataOptions = {}) {
	const query = useQuery({
		...getLivestreamCurrentOptions(),
		enabled,
		retry: false,
		staleTime: 0,
	});

	return {
		...query,
		retry: () => query.refetch(),
	};
}
