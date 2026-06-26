import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import {
	DEFAULT_LOCALE,
	LOCALE_STORAGE_KEY,
	type Locale,
	messages,
} from './config';

type LocaleContextValue = {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	messages: (typeof messages)[Locale];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
	if (typeof window === 'undefined') {
		return DEFAULT_LOCALE;
	}

	const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
	return stored === 'ro' ? 'ro' : DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

	const setLocale = useCallback((nextLocale: Locale) => {
		setLocaleState(nextLocale);
		window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
	}, []);

	const value = useMemo(
		() => ({
			locale,
			setLocale,
			messages: messages[locale],
		}),
		[locale, setLocale]
	);

	return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
	const context = useContext(LocaleContext);

	if (!context) {
		throw new Error('useLocale must be used within LocaleProvider');
	}

	return context;
}

export function useLocaleOptional() {
	return useContext(LocaleContext);
}
