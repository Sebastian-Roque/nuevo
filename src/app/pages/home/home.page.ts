import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isLoggedIn = false;
  userEmail: string | null = null;
  receivedUsername: string = 'Usuario';
  selectedSegment: string = 'mejores-locales';
  
  // Opciones de configuración para el carrusel
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  mejoresLocales = [
    { nombre: 'Local 1', descripcion: 'Descripción del Local 1', imagen: 'assets/img/local1.jpg' },
    { nombre: 'Local 2', descripcion: 'Descripción del Local 2', imagen: 'assets/img/local2.jpg' },
    { nombre: 'Local 3', descripcion: 'Descripción del Local 3', imagen: 'assets/img/local3.jpg' }
  ];

  comentariosPopulares = [
    { autor: 'Juan Pérez', texto: 'Excelente servicio en Local 1.', fecha: new Date() },
    { autor: 'María García', texto: 'Muy buen ambiente en Local 2.', fecha: new Date() }
  ];

  peoresLocales = [
    { nombre: 'Local 4', descripcion: 'Descripción del Local 4', imagen: 'assets/img/local4.jpg' },
    { nombre: 'Local 5', descripcion: 'Descripción del Local 5', imagen: 'assets/img/local5.jpg' }
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.checkUserStatus();
  }

  async checkUserStatus() {
    const user = await this.authService.getCurrentUser();
    this.isLoggedIn = !!user;
    this.userEmail = user?.email || 'Usuario';
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/perfil']);
  }

  logout() {
    this.authService.logout().then(() => this.router.navigate(['/login']));
  }
}
