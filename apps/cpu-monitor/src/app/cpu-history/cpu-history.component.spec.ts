import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuHistoryComponent } from './cpu-history.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';

describe('CpuHistoryComponent', () => {
  let component: CpuHistoryComponent;
  let fixture: ComponentFixture<CpuHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpuHistoryComponent],
      imports: [MatCardModule, MatIconModule, NgChartsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
