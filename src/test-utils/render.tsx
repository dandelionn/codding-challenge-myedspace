import type { ReactNode } from 'react';
import { render as testingLibraryRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { LocaleProvider } from '@/i18n';
import { theme } from '@/theme';

export function render(
	ui: ReactNode,
	options?: { initialEntries?: string[] }
) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});

	return testingLibraryRender(ui, {
		wrapper: ({ children }) => (
			<LocaleProvider>
				<QueryClientProvider client={queryClient}>
					<MantineProvider theme={theme}>
						<MemoryRouter initialEntries={options?.initialEntries ?? ['/']}>
							{children}
						</MemoryRouter>
					</MantineProvider>
				</QueryClientProvider>
			</LocaleProvider>
		),
	});
}

export { screen, waitFor } from '@testing-library/react';
export { userEvent };
