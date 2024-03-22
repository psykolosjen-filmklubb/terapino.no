export const dateFormatterShort = Intl.DateTimeFormat('no', {
	day: 'numeric',
	month: 'long',
	year: 'numeric'
});

export const dateFormatterLongNoYear = Intl.DateTimeFormat('no', {
	weekday: 'long',
	month: 'long',
	day: 'numeric'
});

export const dateFormatterLong = Intl.DateTimeFormat('no', {
	weekday: 'long',
	month: 'long',
	day: 'numeric',
	year: 'numeric'
});
