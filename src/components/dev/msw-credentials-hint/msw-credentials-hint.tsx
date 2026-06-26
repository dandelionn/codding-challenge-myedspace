import { HARDCODED_USER } from '@/mocks/api/constants';
import { useTranslations } from '@/i18n';
import styles from './msw-credentials-hint.module.css';

export default function MswCredentialsHint() {
	const t = useTranslations('dev.msw');

	return (
		<aside className={styles.hint} aria-label={t('credentialsAria')}>
			<p className={styles.title}>{t('credentialsTitle')}</p>
			<dl className={styles.list}>
				<div className={styles.row}>
					<dt>{t('email')}</dt>
					<dd>{HARDCODED_USER.email}</dd>
				</div>
				<div className={styles.row}>
					<dt>{t('password')}</dt>
					<dd>{HARDCODED_USER.password}</dd>
				</div>
			</dl>
		</aside>
	);
}
