import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Url } from "src/url/domain/entities/url.entity";
import { IUrlRepository } from "src/url/domain/repositories/url.repository";
import { UrlTypeOrmEntity } from "../typeorm/url.typeorm.entity";
import { Repository } from "typeorm";

@Injectable()
export class UrlTypeOrmRepository implements IUrlRepository {
    constructor(
        @InjectRepository(UrlTypeOrmEntity)
        private readonly ormRepository: Repository<UrlTypeOrmEntity>) {}

    async create(url: Url): Promise<Url> {
        const urlToSave = new UrlTypeOrmEntity();
        urlToSave.originalUrl = url.originalUrl;
        urlToSave.shortenedUrl = url.shortenedUrl;
        urlToSave.clicks = 0;
        urlToSave.createdAt = url.createdAt;
        const createdUrl = await this.ormRepository.save(urlToSave);
        return new Url(createdUrl.originalUrl, createdUrl.shortenedUrl, createdUrl.clicks, createdUrl.createdAt);
    }

    async findByShortenedUrl(shortenedUrl: string): Promise<Url | null> {
        const foundUrl = await this.ormRepository.findOne({ where: { shortenedUrl } });
        if (!foundUrl) {
            return null;
        }

        return new Url(foundUrl.originalUrl, foundUrl.shortenedUrl, foundUrl.clicks, foundUrl.createdAt);

    }

    async update(url: Url): Promise<Url> {
        const urlToSave = new UrlTypeOrmEntity();
        urlToSave.originalUrl = url.originalUrl;
        urlToSave.shortenedUrl = url.shortenedUrl;
        urlToSave.clicks = url.clicks;

        const updatedUrl = await this.ormRepository.save(urlToSave);
        return new Url(updatedUrl.originalUrl, updatedUrl.shortenedUrl, updatedUrl.clicks, updatedUrl.createdAt);
    }
}