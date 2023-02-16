import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailProgressListComponent } from './trail-progress-list.component';

describe('TrailProgressListComponent', () => {
  let component: TrailProgressListComponent;
  let fixture: ComponentFixture<TrailProgressListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrailProgressListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrailProgressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
