import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComentariosPopularesComponent } from './comentarios-populares.component';

describe('ComentariosPopularesComponent', () => {
  let component: ComentariosPopularesComponent;
  let fixture: ComponentFixture<ComentariosPopularesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentariosPopularesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComentariosPopularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
