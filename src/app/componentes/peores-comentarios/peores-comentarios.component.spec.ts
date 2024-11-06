import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PeoresComentariosComponent } from './peores-comentarios.component';

describe('PeoresComentariosComponent', () => {
  let component: PeoresComentariosComponent;
  let fixture: ComponentFixture<PeoresComentariosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PeoresComentariosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PeoresComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
