import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuCurrentComponent } from './cpu-current.component';

describe('CpuCurrentComponent', () => {
  let component: CpuCurrentComponent;
  let fixture: ComponentFixture<CpuCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuCurrentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
