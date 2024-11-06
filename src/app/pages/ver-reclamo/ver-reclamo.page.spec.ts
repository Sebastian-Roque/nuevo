import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerReclamoPage } from './ver-reclamo.page';

describe('VerReclamoPage', () => {
  let component: VerReclamoPage;
  let fixture: ComponentFixture<VerReclamoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerReclamoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
