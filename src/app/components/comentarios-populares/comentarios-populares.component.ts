import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comentarios-populares',
  templateUrl: './comentarios-populares.component.html',
  styleUrls: ['./comentarios-populares.component.scss'],
})
export class ComentariosPopularesComponent {
  @Input() comentariosPopulares:  any[] = [];
}
