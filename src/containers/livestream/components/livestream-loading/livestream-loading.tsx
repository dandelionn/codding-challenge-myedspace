import { Center, Loader } from '@mantine/core';

export default function LivestreamLoading({ label = 'Loading livestream' }: { label?: string }) {
	return (
		<Center py="xl">
			<Loader aria-label={label} />
		</Center>
	);
}
