import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useTranslations } from '@/i18n';
import { PublicRoutes } from '@/routes';
import styles from './video-login-prompt.module.css';

export type VideoLoginPromptProps = {
	redirectTo?: string;
};

export default function VideoLoginPrompt({ redirectTo }: VideoLoginPromptProps) {
	const t = useTranslations('livestream.loginPrompt');
	const loginPath = redirectTo
		? `${PublicRoutes.login}?redirect=${encodeURIComponent(redirectTo)}`
		: PublicRoutes.login;

	return (
		<div className={styles.prompt} data-testid="video-login-prompt">
			<p className={styles.title}>{t('title')}</p>
			<p className={styles.description}>{t('description')}</p>
			<Button component={Link} to={loginPath} className={styles.button}>
				{t('button')}
			</Button>
		</div>
	);
}
