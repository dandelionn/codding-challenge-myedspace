import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from '@/i18n';
import type { VideoInteractionEvent } from '../../types';
import { formatPlaybackTime } from '../../utils/format-playback-time';
import styles from './video-event-log.module.css';

export type VideoEventLogProps = {
	events: VideoInteractionEvent[];
	onClear?: () => void;
};

function formatEventDetails(event: VideoInteractionEvent): string {
	if (event.type === 'seek') {
		return `${formatPlaybackTime(event.from)} → ${formatPlaybackTime(event.to)}`;
	}

	return formatPlaybackTime(event.currentTime);
}

function badgeClassName(type: VideoInteractionEvent['type']): string {
	if (type === 'play') {
		return styles.badgePlay;
	}

	if (type === 'pause') {
		return styles.badgePause;
	}

	return styles.badgeSeek;
}

export default function VideoEventLog({ events, onClear }: VideoEventLogProps) {
	const listRef = useRef<HTMLUListElement>(null);
	const { locale } = useLocale();
	const t = useTranslations('livestream.events');

	const formatEventTime = (iso: string) =>
		new Date(iso).toLocaleTimeString(locale === 'ro' ? 'ro-RO' : 'en-US');

	useEffect(() => {
		const lastItem = listRef.current?.lastElementChild;

		if (events.length === 0 || !lastItem || typeof lastItem.scrollIntoView !== 'function') {
			return;
		}

		lastItem.scrollIntoView({ block: 'nearest' });
	}, [events]);

	return (
		<section className={styles.panel} aria-label={t('ariaLabel')} data-testid="video-event-log">
			<div className={styles.header}>
				<div className={styles.heading}>
					<div className={styles.titleRow}>
						<h2 className={styles.title}>{t('title')}</h2>
						<span
							className={styles.count}
							aria-label={t('countAriaLabel', { count: events.length })}
						>
							{events.length}
						</span>
					</div>
					<p className={styles.subtitle}>{t('subtitle')}</p>
				</div>
				{onClear && events.length > 0 && (
					<div className={styles.actions}>
						<button type="button" className={styles.clear} onClick={onClear}>
							{t('clear')}
						</button>
					</div>
				)}
			</div>

			{events.length === 0 ? (
				<p className={styles.empty}>{t('empty')}</p>
			) : (
				<ul ref={listRef} className={styles.list} aria-live="polite" aria-relevant="additions">
					{events.map((event, index) => (
						<li key={`${event.at}-${event.type}-${index}`} className={styles.item}>
							<span className={badgeClassName(event.type)}>{t(`types.${event.type}`)}</span>
							<p className={styles.details}>{formatEventDetails(event)}</p>
							<p className={styles.time}>{formatEventTime(event.at)}</p>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
