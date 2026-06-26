import { HARDCODED_USER } from '@/mocks/api/constants';
import styles from './msw-credentials-hint.module.css';

export default function MswCredentialsHint() {
	return (
		<aside className={styles.hint} aria-label="MSW demo credentials">
			<p className={styles.title}>MSW demo user</p>
			<dl className={styles.list}>
				<div className={styles.row}>
					<dt>Email</dt>
					<dd>{HARDCODED_USER.email}</dd>
				</div>
				<div className={styles.row}>
					<dt>Password</dt>
					<dd>{HARDCODED_USER.password}</dd>
				</div>
			</dl>
		</aside>
	);
}
