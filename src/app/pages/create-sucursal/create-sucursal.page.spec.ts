import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSucursalPage } from './create-sucursal.page';

describe('CreateSucursalPage', () => {
  let component: CreateSucursalPage;
  let fixture: ComponentFixture<CreateSucursalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSucursalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
