import AuthLayout from '@/hoc/auth-layout';
import LoginContainer from '@/containers/login';
import MswCredentialsHint from '@/components/dev/msw-credentials-hint';
import LocaleSwitcher from '@/components/i18n/locale-switcher';
import { useMswOptional } from '@/providers/msw-provider';
import { usePageTitle, useTranslations } from '@/i18n';

export default function LoginPage() {
	const t = useTranslations('pages.login');
	usePageTitle(t('title'));
	const msw = useMswOptional();

	return (
		<>
			<LocaleSwitcher />
			{msw?.enabled ? <MswCredentialsHint /> : null}
			<AuthLayout title={t('title')} subtitle={t('subtitle')}>
				<LoginContainer />
			</AuthLayout>
		</>
	);
}
