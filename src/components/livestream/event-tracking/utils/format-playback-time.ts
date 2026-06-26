export function formatPlaybackTime(seconds: number): string {
	const total = Math.max(0, Math.floor(seconds));
	const minutes = Math.floor(total / 60);
	const remainingSeconds = total % 60;

	return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
