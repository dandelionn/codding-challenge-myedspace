import AuthLayout from '@/hoc/auth-layout';
import LoginContainer from '@/containers/login';
import MswCredentialsHint from '@/components/dev/msw-credentials-hint';
import { useMswOptional } from '@/providers/msw-provider';
import { useTranslations } from '@/i18n/use-translations';

export default function LoginPage() {
	const t = useTranslations('pages.login');
	const msw = useMswOptional();

	return (
		<>
			{msw?.enabled ? <MswCredentialsHint /> : null}
			<AuthLayout title={t('title')} subtitle={t('subtitle')}>
				<LoginContainer />
			</AuthLayout>
		</>
	);
}
