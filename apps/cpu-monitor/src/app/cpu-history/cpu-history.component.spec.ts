import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuHistoryComponent } from './cpu-history.component';

describe('CpuHistoryComponent', () => {
  let component: CpuHistoryComponent;
  let fixture: ComponentFixture<CpuHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuHistoryComponent ]
    })
    .compileComponents();
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
