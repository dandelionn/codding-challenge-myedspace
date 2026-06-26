import { useQuery } from '@tanstack/react-query';
import { getLivestreamCurrentOptions } from '@/api/generated/@tanstack/react-query.gen';

type UseLivestreamDataOptions = {
	enabled?: boolean;
};

export function useLivestreamData({ enabled = true }: UseLivestreamDataOptions = {}) {
	return useQuery({
		...getLivestreamCurrentOptions(),
		enabled,
		retry: false,
	});
}
