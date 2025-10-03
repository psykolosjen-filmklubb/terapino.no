/**
 * Country code helpers (ISO 3166-1 alpha-2) -> Norwegian names + flag emoji.
 * Uses Intl.DisplayNames so no extra dependency is required.
 */

// Pre-create a DisplayNames instance for Norwegian Bokmål (fallback to generic 'no' and Nynorsk)
let regionNames: Intl.DisplayNames | undefined;
try {
	// Some environments may not support Intl.DisplayNames; guard gracefully.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const IntlAny = Intl as any;
	if (typeof IntlAny.DisplayNames === "function") {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		regionNames = new IntlAny.DisplayNames(["nb", "no", "nn"], { type: "region" });
	}
} catch (_) {
	// ignore
}

/** Return the Norwegian display name for a country code (e.g. "NO" -> "Norge"). */
export function countryName(code: string): string {
	if (!code) return "";
	const upper = code.toUpperCase();
	try {
		if (regionNames) {
			const name = regionNames.of(upper);
			if (name) return name as string;
		}
	} catch (_) {
		/* ignore */
	}
	return upper; // fallback to code
}

/** Convert a 2-letter country code to a flag emoji (e.g. "NO" -> 🇳🇴). */
export function flagEmoji(code: string): string {
	if (!code || code.length !== 2) return "";
	return code
		.toUpperCase()
		.replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export interface FormatOptions {
	withFlag?: boolean;
}

/** Format a country code into a user-facing string (optionally with flag). */
export function formatCountryCode(code: string, opts: FormatOptions = {}): string {
	const name = countryName(code);
	if (opts.withFlag) {
		const flag = flagEmoji(code);
		return flag ? `${flag} ${name}` : name;
	}
	return name;
}
