import { LoadingOverlay, LoadingOverlayProps } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

type AppLoadingOverlayProps = LoadingOverlayProps & {
	visible?: boolean;
	zIndex?: number;
	onTransitionStart?: () => void;
	onTransitionEnd?: () => void;
};

export function CustomLoadingOverlay({
	visible,
	zIndex = 1000,
	onTransitionStart,
	onTransitionEnd,
	...rest
}: AppLoadingOverlayProps) {
	const colorScheme = useColorScheme();

	const overlayColor = colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';

	return (
		<LoadingOverlay
			visible={visible}
			zIndex={zIndex}
			overlayProps={{ radius: 'sm', blur: 0.3, color: overlayColor }}
			transitionProps={{
				duration: 1000,
				exitDelay: 500,
				onEnter: onTransitionStart,
				onExited: onTransitionEnd,
			}}
			{...rest}
		/>
	);
}
