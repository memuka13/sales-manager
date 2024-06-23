import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManageProductComponent } from './add-manage-product.component';

describe('AddManageProductComponent', () => {
  let component: AddManageProductComponent;
  let fixture: ComponentFixture<AddManageProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddManageProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
