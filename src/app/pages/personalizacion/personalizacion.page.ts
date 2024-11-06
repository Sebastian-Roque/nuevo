import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-personalizacion',
  templateUrl: './personalizacion.page.html',
  styleUrls: ['./personalizacion.page.scss'],
})
export class PersonalizacionPage {
  selectedPrimary: string = localStorage.getItem('color-primary') || '#1e90ff';
  selectedSecondary: string = localStorage.getItem('color-secondary') || '#1c7ed6';
  selectedBackground: string = localStorage.getItem('color-background') || '#ffffff';
  selectedText: string = localStorage.getItem('color-text') || '#333333';

  constructor(private renderer: Renderer2) {}

  updateColors() {
    // Guardar los colores seleccionados
    localStorage.setItem('color-primary', this.selectedPrimary);
    localStorage.setItem('color-secondary', this.selectedSecondary);
    localStorage.setItem('color-background', this.selectedBackground);
    localStorage.setItem('color-text', this.selectedText);

    // Aplicar los colores seleccionados en las variables CSS
    this.renderer.setStyle(document.documentElement, '--color-primary', this.selectedPrimary);
    this.renderer.setStyle(document.documentElement, '--color-secondary', this.selectedSecondary);
    this.renderer.setStyle(document.documentElement, '--color-background', this.selectedBackground);
    this.renderer.setStyle(document.documentElement, '--color-text', this.selectedText);
  }
}
