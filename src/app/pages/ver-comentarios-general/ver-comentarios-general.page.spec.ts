import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerComentariosGeneralPage } from './ver-comentarios-general.page';

describe('VerComentariosGeneralPage', () => {
  let component: VerComentariosGeneralPage;
  let fixture: ComponentFixture<VerComentariosGeneralPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerComentariosGeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
