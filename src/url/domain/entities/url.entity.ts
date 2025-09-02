

export class Url {
	private _originalUrl: string;
	private _shortenedUrl: string;
	private _clicks: number;
	private _createdAt: string;

	constructor(originalUrl: string, shortenedUrl?: string, clicks?: number, createdAt?: string) {

		// Valida se originalUrl é valida
		if (!originalUrl || originalUrl.trim() === '') {
			throw new Error('Invalid original URL');
		}

		if (shortenedUrl && shortenedUrl.trim().length === 0) {
			throw new Error('Invalid shortened URL');
		}

		if (!this.isValidUrl(originalUrl)) {
			throw new Error('Invalid URL format');
		}

		if (shortenedUrl && (shortenedUrl.length > 10 || shortenedUrl.length < 6)) {
			throw new Error('Shortened URL must be between 6 and 10 characters');
		}

		this._originalUrl = originalUrl;
		this._shortenedUrl = shortenedUrl || this.generateShortenedUrl();
		this._clicks = clicks || 0;
		this._createdAt = createdAt || new Date().toISOString();
	}

	private isValidUrl(url: string): boolean {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	}

	get originalUrl(): string {
		return this._originalUrl;
	}

	get createdAt(): string {
		return this._createdAt;
	}

	get shortenedUrl(): string {
		return this._shortenedUrl;
	}

	get clicks(): number {
		return this._clicks;
	}

	generateShortenedUrl(): string {
		const length = Math.floor(Math.random() * 5) + 6; // 6 a 10
		return Math.random().toString(36).substring(2, 2 + length);
	}

	incrementClicks(): void {
		this._clicks += 1;
	}
}