import { Container, Title } from '@mantine/core';
import LivestreamPanel from '@/containers/livestream';
import { usePageTitle, useTranslations } from '@/i18n';

export default function WatchPage() {
	const t = useTranslations('pages.watch');
	usePageTitle(t('title'));

	return (
		<Container component="main" py="xl">
			<Title order={1} mb="lg">
				{t('title')}
			</Title>
			<LivestreamPanel />
		</Container>
	);
}
