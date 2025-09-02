import { MockUrlRepository } from "test/__mocks__/url.repository.mock";
import { GetUrlStatsUseCase } from "src/url/application/use-cases/get-url-stats/get-url-stats.use-case";
import { GetUrlStatsDto } from "src/url/application/use-cases/get-url-stats/get-url-stats.dto";
import { RedirectToOriginalUrlUseCase } from "src/url/application/use-cases/redirect-to-original-url/redirect-to-original-url";


describe('RedirectToOriginalUrlUseCase', () => {
    let redirectToOriginalUrlUseCase: RedirectToOriginalUrlUseCase;
    let mockUrlRepository: MockUrlRepository;

    beforeEach(() => {
        mockUrlRepository = new MockUrlRepository();
        redirectToOriginalUrlUseCase = new RedirectToOriginalUrlUseCase(mockUrlRepository);
    });

    it('should be able to redirect to the original URL', async () => {
        const input: GetUrlStatsDto = {
            shortenedUrl: 'abcdefg'
        };

        await redirectToOriginalUrlUseCase.execute(input);

        expect(mockUrlRepository.urls).toBeDefined()
        expect(mockUrlRepository.urls[0].originalUrl).toBe('https://example.com');
        expect(mockUrlRepository.urls[0].shortenedUrl).toBe('abcdefg');
        expect(mockUrlRepository.urls[0].clicks).toBe(6);
        expect(mockUrlRepository.urls[0].createdAt).toBe('2024-06-01T12:00:00.000Z');
    });
})