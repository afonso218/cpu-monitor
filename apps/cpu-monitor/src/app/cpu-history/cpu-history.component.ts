import { ChartConfiguration, ChartType } from 'chart.js';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { AverageCPU } from '@cpu-monitor/api-interfaces';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';

@Component({
  selector: 'cpu-history',
  templateUrl: './cpu-history.component.html',
  styleUrls: ['./cpu-history.component.css'],
})
export class CpuHistoryComponent implements OnInit {
  /**
   * CPU Usage observable
   */
  @Input() public current$?: Observable<AverageCPU>;

  /**
   * Max History Time (configurable)
   */
  @Input() public historyInterval = 600000;

  /**
   * Chart Component (used to update data)
   */
  @ViewChild(BaseChartDirective) public chart?: BaseChartDirective;

  /**
   * History Data
   */
  public readonly history: AverageCPU[] = [];

  /**
   * Chart Configurations
   */
  public readonly type: ChartType = 'line';
  public readonly mainColor = 'rgba(40, 100, 175, 1)';
  public readonly backgroundColor = 'rgba(2, 173, 224, 0.5)';

  public readonly data: ChartConfiguration['data'] = {
    datasets: [
      {
        label: 'CPU Usage',
        data: [],
        borderColor: this.mainColor,
        backgroundColor: this.backgroundColor,
        pointBackgroundColor: this.mainColor,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'white',
        fill: 'origin',
      },
    ],
    labels: [],
  };

  public readonly options: ChartConfiguration['options'] = {
    plugins: {
      legend: { display: false },
    },
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: { min: 0, max: 100 },
    },
  };

  public ngOnInit(): void {
    this.current$?.subscribe((data: AverageCPU) => {
      this.add(data);
      this.refreshChart();
    });
  }

  /**
   * Add AverageCPU entry
   * @param entry
   */
  private add(entry: AverageCPU): void {
    this.discardOldData();
    this.history.push(entry);
  }

  /**
   * Discard old data from history
   */
  private discardOldData(): void {
    const oldest = new Date(new Date().getTime() - this.historyInterval);
    while (
      this.history.length > 0 &&
      this.history[0].date.getTime() < oldest.getTime()
    ) {
      this.history.shift();
    }
  }

  /**
   * Refresh Chart Data
   */
  private refreshChart(): void {
    this.data.datasets[0].data = this.history.map(
      (value: AverageCPU) => value.value * 100
    );
    this.data.labels = this.history.map((value: AverageCPU) =>
      value.date.toLocaleTimeString()
    );
    this.chart?.update();
  }
}
