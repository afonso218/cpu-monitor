import { Component, Input, OnInit } from '@angular/core';

import { AverageCPU } from '@cpu-monitor/api-interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'cpu-current',
  templateUrl: './cpu-current.component.html',
  styleUrls: ['./cpu-current.component.css'],
})
export class CpuCurrentComponent implements OnInit {
  /**
   * CPU Usage observable
   */
  @Input() public current$?: Observable<AverageCPU>;

  /**
   * Alert Threshold (configurable)
   */
  @Input() public alertThreshold = 0.75;

  /**
   * Warning Threshold (configurable)
   */
  @Input() public warningThreshold = 0.5;

  /**
   * Current Value
   */
  public value = -1;

  public ngOnInit(): void {
    this.current$?.subscribe((data: AverageCPU) => {
      this.value = data.value;
    });
  }

  /**
   * Get class name correspondent to the value
   */
  public get valueClass(): string {
    if (this.value >= this.alertThreshold) {
      return 'alert';
    }
    if (this.value >= this.warningThreshold) {
      return 'medium';
    }
    return 'normal';
  }
}
