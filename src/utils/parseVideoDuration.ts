export const parseVideoDuration = (duration: string): string => {
	const durationParts: string[] = duration
	.replace('PT', '')
	.replace('H', ':')
	.replace('M', ':')
	.replace('S', '')
	.split(':');
		

	if (durationParts.length === 3) {
		return `${durationParts[0]}:${
			parseInt(durationParts[1]) < 10
				? `0${durationParts[1]}`
				: durationParts[1]
		}:${
			parseInt(durationParts[2]) < 10
				? `0${durationParts[2]}`
				: durationParts[2]
		}`;
	}

	if (durationParts.length === 2) {
		return `${durationParts[0]}:${
			parseInt(durationParts[1]) < 10
				? `0${durationParts[1]}`
				: durationParts[1]
		}`;
	}
	if (durationParts.length === 1) {
		return `00:${
			parseInt(durationParts[0]) < 9 ? `0${durationParts[0]}` : durationParts[0]
		}`;
	}
	return '';
};
