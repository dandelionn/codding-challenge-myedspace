import en from '@/messages/en.json';
import ro from '@/messages/ro.json';

export type Locale = 'en' | 'ro';

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_STORAGE_KEY = 'app-locale';

export const messages = {
	en,
	ro,
} as const;

export type Messages = typeof en;

export const locales: { value: Locale; labelKey: string }[] = [
	{ value: 'en', labelKey: 'en' },
	{ value: 'ro', labelKey: 'ro' },
];
