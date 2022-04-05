import { Controller, Get } from '@nestjs/common';

import { AverageCPU } from '@cpu-monitor/api-interfaces';
import { CpuService } from './cpu.service';

@Controller('cpu')
export class CpuController {
  constructor(private readonly cpuService: CpuService) {}

  @Get()
  public getCurrentCPU(): AverageCPU {
    return this.cpuService.getCurrentCPU();
  }
}
