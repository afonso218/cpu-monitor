import { AlertType, CpuAlertsComponent } from './cpu-alerts.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageCPU } from '@cpu-monitor/api-interfaces';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';

describe('CpuAlertsComponent', () => {
  let component: CpuAlertsComponent;
  let fixture: ComponentFixture<CpuAlertsComponent>;
  let stream$: Subject<AverageCPU>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpuAlertsComponent],
      imports: [MatCardModule, MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuAlertsComponent);
    component = fixture.componentInstance;
    stream$ = new Subject<AverageCPU>();
    component.current$ = stream$;
    fixture.detectChanges();
  });

  it('should create with default configuration', () => {
    expect(component).toBeTruthy();
    expect(component.alertValue).toBe(0.75);
    expect(component.alertThreshold).toBe(2 * 60 * 1000); // 2 minutes
    expect(component.maxNumberOfAlerts).toBe(20);
  });

  it('should add usage alert', async () => {
    expect(component).toBeTruthy();
    expect(component.data.length).toBe(0);

    stream$.next({ date: new Date(), value: 0.8 });

    expect(component.data.length).toBe(0);
    expect(component['isNotified']).toBeFalsy();
    expect(component['isLastUsageHigh']).toBeTruthy();

    // move 2 minutes before
    component['lastChange'] = new Date(
      new Date().getTime() - (2 * 60 * 1000 + 1)
    );
    stream$.next({ date: new Date(), value: 0.8 });

    // check that alert was generated
    expect(component['isNotified']).toBeTruthy();
    expect(component['isLastUsageHigh']).toBeTruthy();

    expect(component.data.length).toBe(1);
    expect(component.data[0].type).toBe(AlertType.ALERT);
    expect(component.data[0].message).toBe('CPU under high average load!');
  });

  it('should add recover alert after high usage alert', async () => {
    expect(component).toBeTruthy();
    expect(component.data.length).toBe(0);

    // lets set one high average load (launching and move timer)
    stream$.next({ date: new Date(), value: 0.8 });
    component['lastChange'] = new Date(
      new Date().getTime() - (2 * 60 * 1000 + 1)
    );
    stream$.next({ date: new Date(), value: 0.85 });

    expect(component.data.length).toBe(1);
    expect(component.data[0].type).toBe(AlertType.ALERT);

    // lets set one low average load (launching and move timer)
    stream$.next({ date: new Date(), value: 0.4 });
    component['lastChange'] = new Date(
      new Date().getTime() - (2 * 60 * 1000 + 1)
    );
    stream$.next({ date: new Date(), value: 0.45 });

    // lets check the first element of data is the most recent alert
    expect(component.data.length).toBe(2);
    expect(component.data[0].type).toBe(AlertType.OK);
    expect(component.data[0].message).toBe(
      'CPU recovered from high average load.'
    );
    expect(component.data[1].type).toBe(AlertType.ALERT);
  });
});
