import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrailDetailsContainerComponent } from './trail-details-container.component';

describe('TrailDetailsContainerComponent', () => {
  let component: TrailDetailsContainerComponent;
  let fixture: ComponentFixture<TrailDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrailDetailsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrailDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
