import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-peores-locales',
  templateUrl: './peores-locales.component.html',
  styleUrls: ['./peores-locales.component.scss'],
})
export class PeoresLocalesComponent {
  @Input() peoresLocales: any[] = [];  // Asegúrate de inicializar la propiedad aquí
}
