import { Injectable, Inject } from '@nestjs/common';
import { IUrlRepository } from "src/url/domain/repositories/url.repository";
import { ShortenUrlDto } from "./shorten-url.dto";
import { Url } from "src/url/domain/entities/url.entity";

@Injectable()
export class ShortenUrlUseCase {
    constructor(
        @Inject(IUrlRepository)
        private readonly urlRepository: IUrlRepository
    ) {}

    async execute(inputUrl: ShortenUrlDto): Promise<Url> {
        const existingUrl = await this.urlRepository.findByOriginalUrl(inputUrl.originalUrl);
        if (existingUrl) {
            return existingUrl;
        }

        const url = new Url({ originalUrl: inputUrl.originalUrl });
        return this.urlRepository.create(url);
    }
}