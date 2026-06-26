import { createPortal } from 'react-dom';
import { useMswOptional } from '@/providers/msw-provider';
import styles from './msw-toggle.module.css';

export default function MswToggle() {
	const msw = useMswOptional();

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
			aria-label={enabled ? 'Disable MSW' : 'Enable MSW'}
		>
			{enabled ? 'MSW enabled' : 'MSW disabled'}
		</button>,
		document.body
	);
}
