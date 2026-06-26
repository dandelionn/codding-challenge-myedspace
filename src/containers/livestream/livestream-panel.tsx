import { Text } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { useLivestreamAccess, useVideoEventLog } from '@/components/livestream';
import { useTranslations } from '@/i18n';
import LivestreamLoading from './components/livestream-loading';
import LivestreamPlayerView from './components/livestream-player-view';
import LivestreamUnauthorizedView from './components/livestream-unauthorized-view';
import { useLivestreamData } from './hooks/use-livestream-data';

export default function LivestreamPanel() {
	const location = useLocation();
	const t = useTranslations('livestream');
	const { isAuthenticated, isLoading: isAccessLoading, isError: isAccessError } =
		useLivestreamAccess();
	const { events, recordEvent, clearEvents } = useVideoEventLog();
	const {
		data: livestream,
		isLoading: isLivestreamLoading,
		isError: isLivestreamError,
	} = useLivestreamData({ enabled: isAuthenticated });

	if (isAccessLoading) {
		return <LivestreamLoading label={t('checkingAccess')} />;
	}

	if (!isAuthenticated || isAccessError) {
		return <LivestreamUnauthorizedView redirectTo={location.pathname} />;
	}

	if (isLivestreamLoading) {
		return <LivestreamLoading label={t('loading')} />;
	}

	if (isLivestreamError || !livestream) {
		return <Text c="dimmed">{t('loadError')}</Text>;
	}

	return (
		<LivestreamPlayerView
			livestream={livestream}
			events={events}
			onEvent={recordEvent}
			onClearEvents={clearEvents}
		/>
	);
}
