import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailProgressListItemComponent } from './trail-progress-list-item.component';

describe('TrailProgressListItemComponent', () => {
  let component: TrailProgressListItemComponent;
  let fixture: ComponentFixture<TrailProgressListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrailProgressListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrailProgressListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
