import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';

describe('LinksService', () => {
  let service: LinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinksService],
    }).compile();

    service = module.get<LinksService>(LinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should generate a random short URL', () => {
  //   const shortUrl = service.generateShortUrl();
  //   expect(typeof shortUrl).toBe('string');
  //   expect(shortUrl.length).toBeGreaterThan(0);
  // });
});
