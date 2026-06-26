import { VideoLoginPrompt } from '@/components/livestream';
import { useTranslations } from '@/i18n';
import styles from './livestream-unauthorized-view.module.css';

type LivestreamUnauthorizedViewProps = {
	redirectTo: string;
};

export default function LivestreamUnauthorizedView({
	redirectTo,
}: LivestreamUnauthorizedViewProps) {
	const t = useTranslations('livestream');

	return (
		<section className={styles.panel} aria-label={t('ariaLabel')}>
			<div className={styles.header}>
				<h2 className={styles.title}>{t('title')}</h2>
				<p className={styles.meta}>{t('authRequired')}</p>
			</div>
			<VideoLoginPrompt redirectTo={redirectTo} />
		</section>
	);
}
