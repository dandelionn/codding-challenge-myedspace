import en from '@/messages/en.json';

type Messages = typeof en;

function getNestedValue(source: Record<string, unknown>, path: string): string | undefined {
	return path.split('.').reduce<unknown>((current, key) => {
		if (current && typeof current === 'object' && key in current) {
			return (current as Record<string, unknown>)[key];
		}
		return undefined;
	}, source) as string | undefined;
}

export function useTranslations(namespace: keyof Messages | string) {
	return (key: string) => {
		const value = getNestedValue(en as Record<string, unknown>, `${namespace}.${key}`);
		return value ?? key;
	};
}
