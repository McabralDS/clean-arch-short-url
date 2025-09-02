import { Url } from "../entities/url.entity";

export abstract class IUrlRepository {
    abstract create(url:Url): Promise<Url>;
    abstract findByShortenedUrl(shortenedUrl: string): Promise<Url | null>;
    abstract update(url: Url): Promise<Url>;
}