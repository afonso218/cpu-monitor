import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AverageCPU } from '@cpu-monitor/api-interfaces';
import { NgChartsModule } from 'ng2-charts';
import { Subject } from 'rxjs';
import { CpuHistoryComponent } from './cpu-history.component';

describe('CpuHistoryComponent', () => {
  let component: CpuHistoryComponent;
  let fixture: ComponentFixture<CpuHistoryComponent>;
  let stream$: Subject<AverageCPU>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpuHistoryComponent],
      imports: [MatCardModule, MatIconModule, NgChartsModule],
    }).compileComponents();

    // mock resize observer
    window.ResizeObserver =
      window.ResizeObserver ||
      jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
      }));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuHistoryComponent);
    component = fixture.componentInstance;

    // lets set up the main observable
    stream$ = new Subject<AverageCPU>();
    component.current$ = stream$;
    fixture.detectChanges();
  });

  it('should create with default configurations', () => {
    expect(component).toBeTruthy();
    expect(component.type).toBe('line');

    // chart data is created (but empty)
    expect(component.data).toBeDefined();
    expect(component.data.datasets).toBeDefined();
    expect(component.data.datasets.length).toBe(1);
    expect(component.data.datasets[0].label).toBe('CPU Usage');
    expect(component.data.datasets[0].data.length).toBe(0);
    expect(component.data.labels).toBeDefined();

    // chart options is created
    expect(component.options).toBeDefined();
    expect(component.options?.plugins).toBeDefined();
    expect(component.options?.elements).toBeDefined();

    // component data is created and the default
    expect(component.current$).toBeDefined();
    expect(component.historyInterval).toBe(10 * 60 * 1000); // 10 minutes
    expect(component.history.length).toBe(0);

    // launch a new cpu usage entry (1)
    const entry = { date: new Date(), value: Math.random() };
    stream$.next(entry);
    fixture.detectChanges();

    // lets check if value was added and if it was converted to user friendly value
    expect(component.history.length).toBe(1);

    // value added (percentage value)
    expect(component.data.datasets[0].data.length).toBe(1);
    expect(component.data.datasets[0].data[0]).toBe(entry.value * 100);

    // date added (data format)
    expect(component.data.labels?.length).toBe(1);
    const labels = component.data.labels;
    const element = labels ? labels[0] : undefined;
    expect(element).toBe(entry.date.toLocaleTimeString());
  });

  it('should discard old values after some time', () => {
    expect(component).toBeTruthy();

    // component data is created and the default
    const defaultHistoryInterval = 10 * 60 * 1000; // 10 minutes
    expect(component.current$).toBeDefined();
    expect(component.historyInterval).toBe(defaultHistoryInterval);
    expect(component.history.length).toBe(0);

    // launch a new cpu usage entry (1)
    const oldDate = new Date(
      new Date().getTime() - (defaultHistoryInterval + 1)
    );
    const entry = { date: oldDate, value: Math.random() };
    stream$.next(entry);
    fixture.detectChanges();

    // lets check if the old value was discarded
    expect(component.history.length).toBe(0);
  });
});
