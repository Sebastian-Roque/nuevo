import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerSucursalPage } from './ver-sucursal.page';

describe('VerSucursalPage', () => {
  let component: VerSucursalPage;
  let fixture: ComponentFixture<VerSucursalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerSucursalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
