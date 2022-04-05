import { Subject, catchError, mergeMap, of, timer } from 'rxjs';

import { AverageCPU } from '@cpu-monitor/api-interfaces';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'cpu-monitor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /**
   * Interval of time to fetch data
   */
  private readonly intervalTime = 10000;

  /**
   * Endpoint used to fetch data
   */
  private readonly endpoint = '/api/cpu';

  /**
   * This observable will be responsible to provide information to all child components
   */
  public readonly current$ = new Subject<AverageCPU>();

  /**
   * In case of error we add information the page (hidden)
   */
  public error = '';

  constructor(private http: HttpClient) {
    timer(0, this.intervalTime)
      .pipe(
        mergeMap(() =>
          this.http.get<AverageCPU>(this.endpoint).pipe(
            // in case of error, lets add this information (hidden)
            catchError((error) => {
              this.error = error;
              return of();
            })
          )
        )
      )
      .subscribe((current: AverageCPU) => {
        this.error = '';
        this.current$.next({
          value: current.value + 0.5,
          date: new Date(current.date),
        });
      });
  }
}
