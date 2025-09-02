import { Url } from "src/url/domain/entities/url.entity";
import { IUrlRepository } from "src/url/domain/repositories/url.repository";

export class MockUrlRepository implements IUrlRepository {
    public urls: Url[] = [
        new Url({ 
            originalUrl: 'https://example.com', 
            shortenedUrl: 'abcdefg', 
            clicks: 5, 
            createdAt: '2024-06-01T12:00:00.000Z'
        })];

    async create(url: Url): Promise<Url> {
        this.urls.push(url);
        return url;
    }

    async findByShortenedUrl(shortenedUrl: string): Promise<Url | null> {
        const url = this.urls.find(u => u.shortenedUrl === shortenedUrl);
        return url || null;
    }

    async findByOriginalUrl(originalUrl: string): Promise<Url | null> {
        const url = this.urls.find(u => u.originalUrl === originalUrl);
        return url || null;
    }

    async update(url: Url): Promise<Url> {
        const index = this.urls.findIndex(u => u.shortenedUrl === url.shortenedUrl);
        if (index !== -1) {
            this.urls[index] = url;
            return url;
        }
        throw new Error('URL not found');
    }
}