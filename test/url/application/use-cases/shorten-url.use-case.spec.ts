import { ShortenUrlUseCase } from "src/url/application/use-cases/shorten-url/shorten-url.use-case";
import { ShortenUrlDto } from "src/url/application/use-cases/shorten-url/shorten-url.dto";
import { MockUrlRepository } from "test/__mocks__/url.repository.mock";


describe('ShortenUrlUseCase', () => {
    let shortenUrlUseCase: ShortenUrlUseCase;
    let mockUrlRepository: MockUrlRepository;

    beforeEach(() => {
        mockUrlRepository = new MockUrlRepository();
        shortenUrlUseCase = new ShortenUrlUseCase(mockUrlRepository);
    });

    it('should be able to create a new shortened URL', async () => {
        const input: ShortenUrlDto = {
            originalUrl: 'https://example.com/some/long/url'
        };

        await shortenUrlUseCase.execute(input);

        expect(mockUrlRepository.urls).toHaveLength(2);
        expect(mockUrlRepository.urls[0].shortenedUrl).toBeDefined();
        expect(mockUrlRepository.urls[0].shortenedUrl.length).toBeGreaterThanOrEqual(6);
        expect(mockUrlRepository.urls[0].shortenedUrl.length).toBeLessThanOrEqual(10);
    });
})