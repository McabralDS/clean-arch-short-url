import { Injectable, Inject } from '@nestjs/common';
import { IUrlRepository } from "src/url/domain/repositories/url.repository";
import { GetUrlStatsDto } from "./get-url-stats.dto";
import { Url } from "src/url/domain/entities/url.entity";

@Injectable()
export class GetUrlStatsUseCase {
    constructor(
        @Inject(IUrlRepository)
        private readonly urlRepository: IUrlRepository
    ) {}

    async execute(inputUrl: GetUrlStatsDto): Promise<Url> {
        const url = await this.urlRepository.findByShortenedUrl(inputUrl.shortenedUrl);

        if (!url) {
            throw new Error('URL not found');
        }

        return url;
    }
}