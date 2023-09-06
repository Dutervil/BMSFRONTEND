import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAndPrintComponent } from './view-and-print.component';

describe('ViewAndPrintComponent', () => {
  let component: ViewAndPrintComponent;
  let fixture: ComponentFixture<ViewAndPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAndPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAndPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
