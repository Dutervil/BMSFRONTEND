import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeneficiareFormComponent } from './add-beneficiare-form.component';

describe('AddBeneficiareFormComponent', () => {
  let component: AddBeneficiareFormComponent;
  let fixture: ComponentFixture<AddBeneficiareFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBeneficiareFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBeneficiareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
