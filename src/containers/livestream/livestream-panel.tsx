import { useLocation } from 'react-router-dom';
import { useLivestreamAccess, useVideoEventLog } from '@/components/livestream';
import { useTranslations } from '@/i18n';
import LivestreamErrorView from './components/livestream-error-view';
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
		isPending: isLivestreamPending,
		isFetching: isLivestreamFetching,
		isError: isLivestreamError,
		retry: retryLivestream,
	} = useLivestreamData({ enabled: isAuthenticated });

	if (isAccessLoading) {
		return <LivestreamLoading label={t('checkingAccess')} />;
	}

	if (!isAuthenticated || isAccessError) {
		return <LivestreamUnauthorizedView redirectTo={location.pathname} />;
	}

	if (isLivestreamPending && !isLivestreamError) {
		return <LivestreamLoading label={t('loading')} />;
	}

	if (isLivestreamError) {
		return (
			<LivestreamErrorView
				onRetry={() => {
					void retryLivestream();
				}}
				isRetrying={isLivestreamFetching}
			/>
		);
	}

	if (!livestream) {
		return <LivestreamLoading label={t('loading')} />;
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
