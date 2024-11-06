import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  isLoggedIn: boolean = false;
  userRole: string | null = null; // Inicializa como null para usuario no autenticado


  constructor(private authService: AuthService) {}
  async ngOnInit() {
    // Verificar si el usuario está autenticado y obtener el rol
    const user = await this.authService.getCurrentUser();
    if (user) {
      this.isLoggedIn = true;
      this.userRole = user.role; // Asigna el rol desde AuthService
    } else {
      this.isLoggedIn = false;
      this.userRole = null; // No asigna ningún rol si no está autenticado
    }
  }

}
