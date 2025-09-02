import { Injectable, Inject } from '@nestjs/common';
import { IUrlRepository } from "src/url/domain/repositories/url.repository";
import { RedirectToOriginalUrlDto } from "./redirect-to-original-url.dto";
import { Url } from "src/url/domain/entities/url.entity";

@Injectable()
export class RedirectToOriginalUrlUseCase {
    constructor(
        @Inject(IUrlRepository)
        private readonly urlRepository: IUrlRepository
    ) {}

    async execute(inputUrl: RedirectToOriginalUrlDto): Promise<Url> {
        const url = await this.urlRepository.findByShortenedUrl(inputUrl.shortenedUrl);

        if (!url) {
            throw new Error('URL not found');
        }

        url.incrementClicks();

        return await this.urlRepository.update(url);
    }
}