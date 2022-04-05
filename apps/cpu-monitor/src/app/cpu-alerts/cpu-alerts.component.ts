import { Component, Input, OnInit } from '@angular/core';

import { AverageCPU } from '@cpu-monitor/api-interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'cpu-alerts',
  templateUrl: './cpu-alerts.component.html',
  styleUrls: ['./cpu-alerts.component.css'],
})
export class CpuAlertsComponent implements OnInit {
  /**
   * CPU Usage observable
   */
  @Input() public current$?: Observable<AverageCPU>;

  /**
   * Alert Threshold (configurable)
   */
  @Input() public alertValue = 0.75;

  /**
   * Alert Time Hold (configurable) - 2 minutes
   */
  @Input() public alertThreshold = 2000; //120000;

  /**
   * Alerts data
   */
  public readonly data: Alert[] = [];

  /**
   * Alerts last time seen
   */
  private isLastUsageHigh = false;
  private isNotified = false;
  private lastChange: Date | undefined;

  public ngOnInit(): void {
    this.current$?.subscribe((data: AverageCPU) => {
      this.checkAlert(data);
    });
  }

  /**
   * Check we should generate a Alert based on last cpu usage
   * @param data
   * @returns
   */
  private checkAlert(data: AverageCPU): void {
    // lets check if value is high
    const isHigh = data.value >= this.alertValue;

    // if different state (change date)
    if (this.isLastUsageHigh !== isHigh) {
      this.lastChange = data.date;
      this.isLastUsageHigh = isHigh;
      this.isNotified = false;
    }

    // lets check if we need to notify the user
    if (!this.isNotified) {
      const launchTime = new Date().getTime() - this.alertThreshold;
      if (this.lastChange && this.lastChange?.getTime() < launchTime) {
        this.lastChange = data.date;
        this.isNotified = true;
        this.data.unshift({
          type: isHigh ? AlertType.ALERT : AlertType.OK,
          date: data.date,
          message: isHigh
            ? `CPU under high average load!`
            : `CPU recovered from high average load.`,
        });
      }
    }
  }

  /**
   * Convert time to a friendly way
   * @param value
   * @returns
   */
  public convertToTimeAgo(value: Date): string {
    const diff = new Date().getTime() - value.getTime();

    const minutesDiff = Math.floor(diff / 60000);
    if (minutesDiff > 0) {
      return `${minutesDiff} minute(s) ago`;
    }

    const secondsDiff = Math.floor(diff / 1000);
    if (secondsDiff > 0) {
      return `${secondsDiff} second(s) ago`;
    }

    return 'just now';
  }

  /**
   * Get Alert types
   */
  public get alertTypes(): typeof AlertType {
    return AlertType;
  }
}

interface Alert {
  type: AlertType;
  date: Date;
  message: string;
}

enum AlertType {
  ALERT = 'alert',
  OK = 'ok',
}
