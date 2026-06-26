import { Button, Code, List, Modal, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslations } from '@/i18n';
import { PrivateRoutes, PublicRoutes } from '@/routes';
import styles from './welcome-modal.module.css';

export const WELCOME_MODAL_SEEN_KEY = 'app-welcome-seen';

const ROUTE_KEYS = ['watch', 'login', 'dashboard'] as const;
const TECH_KEYS = [
	'react',
	'vite',
	'mantine',
	'router',
	'reactQuery',
	'openapi',
	'msw',
	'vitest',
	'i18n',
] as const;

export default function WelcomeModal() {
	const t = useTranslations('welcomeModal');
	const [opened, setOpened] = useState(false);

	useEffect(() => {
		if (localStorage.getItem(WELCOME_MODAL_SEEN_KEY) !== 'true') {
			setOpened(true);
		}
	}, []);

	const dismiss = () => {
		localStorage.setItem(WELCOME_MODAL_SEEN_KEY, 'true');
		setOpened(false);
	};

	const routePaths: Record<(typeof ROUTE_KEYS)[number], string> = {
		watch: PublicRoutes.watch,
		login: PublicRoutes.login,
		dashboard: PrivateRoutes.dashboard,
	};

	return (
		<Modal
			opened={opened}
			onClose={dismiss}
			title={t('title')}
			size="lg"
			centered
			transitionProps={{ transition: 'fade', duration: 200 }}
			classNames={{
				inner: styles.inner,
				content: styles.content,
			}}
			closeButtonProps={{ 'aria-label': t('closeAria') }}
		>
			<Stack gap="md">
				<Text>{t('intro')}</Text>

				<div>
					<Title order={4}>{t('routesTitle')}</Title>
					<List spacing="xs" mt="xs">
						{ROUTE_KEYS.map((key) => (
							<List.Item key={key}>
								<Code>{routePaths[key]}</Code>
								{' — '}
								{t(`routes.${key}`)}
							</List.Item>
						))}
					</List>
				</div>

				<div>
					<Title order={4}>{t('techTitle')}</Title>
					<List spacing="xs" mt="xs">
						{TECH_KEYS.map((key) => (
							<List.Item key={key}>{t(`tech.${key}`)}</List.Item>
						))}
					</List>
				</div>

				<Button onClick={dismiss} fullWidth>
					{t('gotIt')}
				</Button>
			</Stack>
		</Modal>
	);
}
