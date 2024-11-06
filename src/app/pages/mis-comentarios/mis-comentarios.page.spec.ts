import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisComentariosPage } from './mis-comentarios.page';

describe('MisComentariosPage', () => {
  let component: MisComentariosPage;
  let fixture: ComponentFixture<MisComentariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisComentariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
