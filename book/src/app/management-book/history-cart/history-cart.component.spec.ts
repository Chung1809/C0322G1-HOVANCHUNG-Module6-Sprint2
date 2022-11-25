import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCartComponent } from './history-cart.component';

describe('HistoryCartComponent', () => {
  let component: HistoryCartComponent;
  let fixture: ComponentFixture<HistoryCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
