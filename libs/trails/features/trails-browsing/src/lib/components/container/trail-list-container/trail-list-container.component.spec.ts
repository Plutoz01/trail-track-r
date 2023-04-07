import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailListContainerComponent } from './trail-list-container.component';

describe('TrailListComponent', () => {
  let component: TrailListContainerComponent;
  let fixture: ComponentFixture<TrailListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrailListContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrailListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
