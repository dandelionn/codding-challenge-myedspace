import { useLocale } from './locale-context';
import type { Messages } from './config';

function getNestedValue(source: Record<string, unknown>, path: string): string | undefined {
	return path.split('.').reduce<unknown>((current, key) => {
		if (current && typeof current === 'object' && key in current) {
			return (current as Record<string, unknown>)[key];
		}
		return undefined;
	}, source) as string | undefined;
}

function interpolate(template: string, values?: Record<string, string | number>) {
	if (!values) {
		return template;
	}

	return Object.entries(values).reduce((result, [key, value]) => {
		return result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
	}, template);
}

export function useTranslations(namespace: keyof Messages | string) {
	const { messages } = useLocale();

	return (key: string, values?: Record<string, string | number>) => {
		const value = getNestedValue(messages as Record<string, unknown>, `${namespace}.${key}`);
		return interpolate(value ?? key, values);
	};
}
