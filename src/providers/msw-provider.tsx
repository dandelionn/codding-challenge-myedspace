import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';

type MswContextValue = {
	enabled: boolean;
	ready: boolean;
	toggle: () => void;
};

const MswContext = createContext<MswContextValue | null>(null);

const isDev = import.meta.env.DEV;

export function MswProvider({ children }: { children: ReactNode }) {
	const [enabled, setEnabled] = useState(true);
	const [ready, setReady] = useState(!isDev);

	useEffect(() => {
		if (!isDev) {
			return;
		}

		let cancelled = false;

		(async () => {
			const { worker } = await import('@/mocks/browser');

			if (cancelled) {
				return;
			}

			if (enabled) {
				await worker.start({ onUnhandledRequest: 'warn' });
			} else {
				worker.stop();
			}

			setReady(true);
		})();

		return () => {
			cancelled = true;
		};
	}, [enabled]);

	const toggle = useCallback(() => {
		setEnabled((current) => !current);
	}, []);

	const value = useMemo(
		() => ({
			enabled,
			ready,
			toggle,
		}),
		[enabled, ready, toggle]
	);

	return <MswContext.Provider value={value}>{children}</MswContext.Provider>;
}

export function useMsw() {
	const context = useContext(MswContext);

	if (!context) {
		throw new Error('useMsw must be used within MswProvider');
	}

	return context;
}

export function useMswOptional() {
	return useContext(MswContext);
}
