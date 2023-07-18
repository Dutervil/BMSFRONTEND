import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBeneficiareComponent } from './list-beneficiare.component';

describe('ListBeneficiareComponent', () => {
  let component: ListBeneficiareComponent;
  let fixture: ComponentFixture<ListBeneficiareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBeneficiareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBeneficiareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
