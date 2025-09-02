import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IUrlRepository } from '../domain/repositories/url.repository';
import { ShortenUrlUseCase } from '../application/use-cases/shorten-url/shorten-url.use-case';
import { UrlController } from './controller/url.controller';
import { UrlTypeOrmEntity } from './database/typeorm/url.typeorm.entity';
import { UrlTypeOrmRepository } from './database/sqlite/url.typeorm.repository';
import { GetUrlStatsUseCase } from '../application/use-cases/get-url-stats/get-url-stats.use-case';
import { RedirectToOriginalUrlUseCase } from '../application/use-cases/redirect-to-original-url/redirect-to-original-url';

@Module({
  imports: [TypeOrmModule.forFeature([UrlTypeOrmEntity])],
  controllers: [UrlController],
  providers: [
    ShortenUrlUseCase,
    GetUrlStatsUseCase,
    RedirectToOriginalUrlUseCase,
    {
      provide: IUrlRepository,
      useClass: UrlTypeOrmRepository,
    },
  ],
})
export class UrlModule {}