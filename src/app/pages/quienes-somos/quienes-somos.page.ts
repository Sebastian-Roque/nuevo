import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.page.html',
  styleUrls: ['./quienes-somos.page.scss'],
})
export class QuienesSomosPage {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
