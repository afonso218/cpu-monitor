import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuAlertsComponent } from './cpu-alerts.component';

describe('CpuAlertsComponent', () => {
  let component: CpuAlertsComponent;
  let fixture: ComponentFixture<CpuAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
