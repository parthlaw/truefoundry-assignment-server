import { Test, TestingModule } from '@nestjs/testing';
import { ApiclientService } from './apiclient.service';

describe('ApiclientService', () => {
  let service: ApiclientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiclientService],
    }).compile();

    service = module.get<ApiclientService>(ApiclientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
