import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewTableOneComponent } from './product-view-table-one.component';

describe('ProductViewTableOneComponent', () => {
  let component: ProductViewTableOneComponent;
  let fixture: ComponentFixture<ProductViewTableOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductViewTableOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewTableOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
