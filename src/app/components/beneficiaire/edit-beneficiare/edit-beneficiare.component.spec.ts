import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBeneficiareComponent } from './edit-beneficiare.component';

describe('EditBeneficiareComponent', () => {
  let component: EditBeneficiareComponent;
  let fixture: ComponentFixture<EditBeneficiareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBeneficiareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBeneficiareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
