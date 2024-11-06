import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComentariosSucursalPage } from './comentarios-sucursal.page';

describe('ComentariosSucursalPage', () => {
  let component: ComentariosSucursalPage;
  let fixture: ComponentFixture<ComentariosSucursalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosSucursalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
