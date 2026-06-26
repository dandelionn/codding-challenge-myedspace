import { Button, Stack, Text } from '@mantine/core';
import { useTranslations } from '@/i18n';

type LivestreamErrorViewProps = {
	onRetry: () => void;
	isRetrying?: boolean;
};

export default function LivestreamErrorView({ onRetry, isRetrying }: LivestreamErrorViewProps) {
	const t = useTranslations('livestream');

	return (
		<Stack align="center" gap="sm" py="xl" role="alert">
			<Text c="dimmed">{t('loadError')}</Text>
			<Button onClick={onRetry} loading={isRetrying} variant="light">
				{t('retry')}
			</Button>
		</Stack>
	);
}
