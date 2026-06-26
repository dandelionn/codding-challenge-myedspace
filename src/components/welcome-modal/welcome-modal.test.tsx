import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { describe, expect, it, beforeEach } from 'vitest';
import { LocaleProvider } from '@/i18n';
import { theme } from '@/theme';
import WelcomeModal, { WELCOME_MODAL_SEEN_KEY } from './welcome-modal';

function renderWelcomeModal() {
	return render(
		<LocaleProvider>
			<MantineProvider theme={theme}>
				<WelcomeModal />
			</MantineProvider>
		</LocaleProvider>
	);
}

describe('WelcomeModal', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('opens on the first visit', async () => {
		renderWelcomeModal();

		const dialog = await screen.findByRole('dialog');
		const view = within(dialog);

		expect(view.getByText(/welcome to the app/i)).toBeInTheDocument();
		expect(view.getByRole('heading', { name: /main routes/i })).toBeInTheDocument();
		expect(view.getByRole('heading', { name: /tech stack/i })).toBeInTheDocument();
	});

	it('does not open after the user has dismissed it', () => {
		localStorage.setItem(WELCOME_MODAL_SEEN_KEY, 'true');
		renderWelcomeModal();

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('persists dismissal when the user clicks Got it', async () => {
		const user = userEvent.setup();
		renderWelcomeModal();

		const dialog = await screen.findByRole('dialog');
		await user.click(within(dialog).getByRole('button', { name: /got it/i }));

		expect(localStorage.getItem(WELCOME_MODAL_SEEN_KEY)).toBe('true');

		await waitFor(() => {
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		});
	});
});
