import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBeneficiareComponent } from './view-beneficiare.component';

describe('ViewBeneficiareComponent', () => {
  let component: ViewBeneficiareComponent;
  let fixture: ComponentFixture<ViewBeneficiareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBeneficiareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBeneficiareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
