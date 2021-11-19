import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardAdminComponent } from './product-card-admin.component';

describe('ProductCardAdminComponent', () => {
  let component: ProductCardAdminComponent;
  let fixture: ComponentFixture<ProductCardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
