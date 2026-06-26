export function shouldUseMockVideoPlayer() {
	return import.meta.env.VITEST === true || import.meta.env.MODE === 'test';
}
