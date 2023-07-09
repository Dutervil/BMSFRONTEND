import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiareEditComponent } from './beneficiare-edit.component';

describe('BeneficiareEditComponent', () => {
  let component: BeneficiareEditComponent;
  let fixture: ComponentFixture<BeneficiareEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiareEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiareEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
