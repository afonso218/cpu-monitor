import * as os from 'os';

import { AverageCPU } from '@cpu-monitor/api-interfaces';
import { Injectable } from '@nestjs/common';
import { cpu } from 'node-os-utils';

@Injectable()
export class CpuService {
  private isWindows: boolean;

  constructor() {
    this.isWindows = process.platform === 'win32';
  }

  /**
   * Get Current CPU (average)
   * @returns
   */
  public async getCurrentCPU(): Promise<AverageCPU> {
    const date = new Date();
    let value: number;
    if (this.isWindows) {
      value = await cpu.usage();
    } else {
      value = os.loadavg()[0] / os.cpus().length;
    }
    return { date, value };
  }
}
