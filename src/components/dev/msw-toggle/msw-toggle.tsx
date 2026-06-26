import { createPortal } from 'react-dom';
import { useMswOptional } from '@/providers/msw-provider';
import { useTranslations } from '@/i18n';
import styles from './msw-toggle.module.css';

export default function MswToggle() {
	const msw = useMswOptional();
	const t = useTranslations('dev.msw');

	if (!import.meta.env.DEV || !msw) {
		return null;
	}

	const { enabled, toggle } = msw;

	return createPortal(
		<button
			type="button"
			onClick={toggle}
			className={styles.toggle}
			data-active={enabled}
			aria-pressed={enabled}
			aria-label={enabled ? t('disableAria') : t('enableAria')}
		>
			{enabled ? t('enabled') : t('disabled')}
		</button>,
		document.body
	);
}
