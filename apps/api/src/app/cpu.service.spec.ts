import * as os from 'os';

import { CpuService } from './cpu.service';
import { Test } from '@nestjs/testing';

describe('CpuService', () => {
  let service: CpuService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [CpuService],
    }).compile();

    service = app.get<CpuService>(CpuService);
  });

  it('getCurrentCPU"', () => {
    expect(service).toBeTruthy();

    jest.spyOn(os, 'loadavg').mockImplementation(() => [0.5, 0, 0]);
    jest.spyOn(os, 'cpus');

    const beforeCall = new Date();
    const result = service.getCurrentCPU();

    expect(result.date).toBeDefined();
    expect(result.date.getTime()).toBeGreaterThanOrEqual(beforeCall.getTime());
    expect(result.date.getTime()).toBeLessThanOrEqual(new Date().getTime());

    expect(os.loadavg).toBeCalledTimes(1);
    expect(os.cpus).toBeCalledTimes(1);

    const value = os.loadavg()[0] / os.cpus().length;
    // const date = new Date();
    // return { date, value };

    // expect(service.getData()).toEqual({ message: 'Welcome to api!' });
  });
});
