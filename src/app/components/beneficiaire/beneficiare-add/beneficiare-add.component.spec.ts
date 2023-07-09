import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiareAddComponent } from './beneficiare-add.component';

describe('BeneficiareAddComponent', () => {
  let component: BeneficiareAddComponent;
  let fixture: ComponentFixture<BeneficiareAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiareAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiareAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
