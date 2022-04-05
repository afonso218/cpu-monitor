import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuCurrentComponent } from './cpu-current.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

describe('CpuCurrentComponent', () => {
  let component: CpuCurrentComponent;
  let fixture: ComponentFixture<CpuCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpuCurrentComponent],
      imports: [MatCardModule, MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuCurrentComponent);
    component = fixture.componentInstance;
  });

  it('should create and display values', () => {
    expect(component).toBeTruthy();

    // check default value
    expect(component.alertThreshold).toBe(0.75);
    expect(component.warningThreshold).toBe(0.5);

    component.current$ = of({ date: new Date(), value: 0.8 });
    fixture.detectChanges();
    expect(component.value).toBe(0.8);
  });

  it('background color class should change according to the value received - alert', () => {
    component.current$ = of({ date: new Date(), value: 0.8 });
    fixture.detectChanges();
    expect(component.value).toBe(0.8);
    expect(component.valueClass).toBe('alert');
  });

  it('background color class should change according to the value received - warning', () => {
    component.current$ = of({ date: new Date(), value: 0.5 });
    fixture.detectChanges();
    expect(component.value).toBe(0.5);
    expect(component.valueClass).toBe('medium');
  });
  it('background color class should change according to the value received - normal', () => {
    component.current$ = of({ date: new Date(), value: 0.2 });
    fixture.detectChanges();
    expect(component.value).toBe(0.2);
    expect(component.valueClass).toBe('normal');
  });
});
