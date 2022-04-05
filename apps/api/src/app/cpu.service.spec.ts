import * as os from 'os';

import { CpuService } from './cpu.service';
import { Test } from '@nestjs/testing';
import { cpu } from 'node-os-utils';

describe('CpuService', () => {
  let service: CpuService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [CpuService],
    }).compile();
    service = app.get<CpuService>(CpuService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getCurrentCPU - call macOS and linux"', async () => {
    expect(service).toBeTruthy();

    service['isWindows'] = false;
    const mockLoadAvg = [0.5, 0, 0];

    jest.spyOn(os, 'loadavg').mockImplementation(() => mockLoadAvg);
    jest.spyOn(os, 'cpus');
    jest.spyOn(cpu, 'usage');

    const beforeCall = new Date();
    const result = await service.getCurrentCPU();

    expect(result.date).toBeDefined();
    expect(result.date.getTime()).toBeGreaterThanOrEqual(beforeCall.getTime());
    expect(result.date.getTime()).toBeLessThanOrEqual(new Date().getTime());

    expect(os.loadavg).toBeCalledTimes(1);
    expect(os.cpus).toBeCalledTimes(1);
    expect(cpu.usage).not.toBeCalled();
    expect(result.value).toBe(mockLoadAvg[0] / os.cpus().length);
  });

  it('getCurrentCPU - call windows"', async () => {
    expect(service).toBeTruthy();

    service['isWindows'] = true;

    jest.spyOn(os, 'loadavg');
    jest.spyOn(os, 'cpus');
    jest.spyOn(cpu, 'usage').mockImplementation(() => Promise.resolve(1));

    const beforeCall = new Date();
    const result = await service.getCurrentCPU();

    expect(result.date).toBeDefined();
    expect(result.date.getTime()).toBeGreaterThanOrEqual(beforeCall.getTime());
    expect(result.date.getTime()).toBeLessThanOrEqual(new Date().getTime());

    expect(os.loadavg).not.toBeCalled();
    expect(os.cpus).not.toBeCalled();
    expect(cpu.usage).toBeCalledTimes(1);
  });
});
