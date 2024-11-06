import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private renderer: Renderer2) {
    this.applySavedColors();
  }

  applySavedColors() {
    const primary = localStorage.getItem('color-primary') || '#1e90ff';
    const secondary = localStorage.getItem('color-secondary') || '#1c7ed6';
    const background = localStorage.getItem('color-background') || '#ffffff';
    const text = localStorage.getItem('color-text') || '#333333';

    this.renderer.setStyle(document.documentElement, '--color-primary', primary);
    this.renderer.setStyle(document.documentElement, '--color-secondary', secondary);
    this.renderer.setStyle(document.documentElement, '--color-background', background);
    this.renderer.setStyle(document.documentElement, '--color-text', text);
  }
}