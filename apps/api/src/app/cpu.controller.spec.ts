import { CpuController } from './cpu.controller';
import { CpuService } from './cpu.service';
import { Test } from '@nestjs/testing';

describe('CpuController', () => {
  let cpuController: CpuController;
  let cpuService: CpuService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      controllers: [CpuController],
      providers: [CpuService],
    }).compile();
    cpuController = app.get<CpuController>(CpuController);
    cpuService = app.get<CpuService>(CpuService);
  });

  it('getCurrentCPU endpoint should invoke cpuService to retrieve cpu load data"', async () => {
    expect(cpuController).toBeTruthy();
    expect(cpuService).toBeTruthy();

    jest.spyOn(cpuService, 'getCurrentCPU');

    const result = await cpuController.getCurrentCPU();

    expect(result).toBeDefined();
    expect(result.date).toBeDefined();
    expect(result.value).toBeDefined();
    expect(cpuService.getCurrentCPU).toBeCalledTimes(1);
  });
});
