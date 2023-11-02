import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepencesListComponent } from './depences-list.component';

describe('DepencesListComponent', () => {
  let component: DepencesListComponent;
  let fixture: ComponentFixture<DepencesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepencesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
