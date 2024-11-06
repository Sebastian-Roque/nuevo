import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mejores-locales',
  templateUrl: './mejores-locales.component.html',
  styleUrls: ['./mejores-locales.component.scss'],
})
export class MejoresLocalesComponent {
  @Input() mejoresLocales:  any[] = [];
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
}
