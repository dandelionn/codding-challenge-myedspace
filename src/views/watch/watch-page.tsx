import { Container } from '@mantine/core';
import LivestreamPanel from '@/containers/livestream';

export default function WatchPage() {
	return (
		<Container py="xl">
			<LivestreamPanel />
		</Container>
	);
}
