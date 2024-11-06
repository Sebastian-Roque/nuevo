import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AyudaAlClientePage } from './ayuda-al-cliente.page';

describe('AyudaAlClientePage', () => {
  let component: AyudaAlClientePage;
  let fixture: ComponentFixture<AyudaAlClientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudaAlClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
