export type VideoInteractionEvent =
	| {
			type: 'play';
			at: string;
			currentTime: number;
		}
	| {
			type: 'pause';
			at: string;
			currentTime: number;
		}
	| {
			type: 'seek';
			at: string;
			from: number;
			to: number;
		};
