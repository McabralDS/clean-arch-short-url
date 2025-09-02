import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Redirect } from '@nestjs/common';
import { ShortenUrlDto } from 'src/url/application/use-cases/shorten-url/shorten-url.dto';
import { ShortenUrlUseCase } from 'src/url/application/use-cases/shorten-url/shorten-url.use-case';
import { GetUrlStatsUseCase } from 'src/url/application/use-cases/get-url-stats/get-url-stats.use-case';
import { RedirectToOriginalUrlUseCase } from 'src/url/application/use-cases/redirect-to-original-url/redirect-to-original-url';

@Controller()
export class UrlController {

  constructor(
    private readonly shortenUrlUseCase: ShortenUrlUseCase,
    private readonly redirectToOriginalUrlUseCase: RedirectToOriginalUrlUseCase,
    private readonly getUrlStatsUseCase: GetUrlStatsUseCase

  ) {}

  @Get(':shortenedUrl')
  @Redirect(undefined, HttpStatus.PERMANENT_REDIRECT)
  async redirectToOriginalUrl(@Param('shortenedUrl') shortenedUrl: string) {
    try {
      const url = await this.redirectToOriginalUrlUseCase.execute({shortenedUrl});
      return { url: url.originalUrl };

    } catch {
      throw new HttpException('URL not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':shortenedUrl/stats')
  async getStats(@Param('shortenedUrl') shortenedUrl: string) {
    try {
      const url = await this.getUrlStatsUseCase.execute({ shortenedUrl });
      return url;
    } catch {
      return "URL not found"
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: ShortenUrlDto) {
    return await this.shortenUrlUseCase.execute(body);
  }
}
