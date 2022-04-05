import * as os from 'os';

import { AverageCPU } from '@cpu-monitor/api-interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CpuService {
  /**
   * Get Current CPU (average)
   * @returns
   */
  public getCurrentCPU(): AverageCPU {
    const value = os.loadavg()[0] / os.cpus().length;
    const date = new Date();
    return { date, value };
  }
}
