import { locales, useLocale, useTranslations } from '@/i18n';
import styles from './locale-switcher.module.css';

export default function LocaleSwitcher() {
	const { locale, setLocale } = useLocale();
	const t = useTranslations('locale');

	return (
		<div className={styles.switcher} role="group" aria-label={t('label')}>
			{locales.map(({ value, labelKey }) => {
				const isActive = locale === value;

				return (
					<button
						key={value}
						type="button"
						className={isActive ? styles.buttonActive : styles.button}
						aria-pressed={isActive}
						onClick={() => setLocale(value)}
					>
						{t(labelKey)}
					</button>
				);
			})}
		</div>
	);
}
