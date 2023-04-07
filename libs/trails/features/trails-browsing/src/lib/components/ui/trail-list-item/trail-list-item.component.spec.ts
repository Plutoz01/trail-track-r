import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailListItemComponent } from './trail-list-item.component';

describe('TrailListItemComponent', () => {
  let component: TrailListItemComponent;
  let fixture: ComponentFixture<TrailListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrailListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrailListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
