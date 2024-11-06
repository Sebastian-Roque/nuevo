import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  isLoggedIn: boolean = false;
  userRole: string | null = null; // Inicializa como null para usuario no autenticado

  constructor(private navCtrl: NavController, private authService: AuthService) {}

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

  // Método para cerrar sesión
  logOut() {
    this.authService.logout(); // Llama al método de logout en AuthService
    this.isLoggedIn = false;
    this.userRole = null;
    this.navCtrl.navigateRoot('/tabs/home'); // Navega a la página de inicio
  }

  // Navegación según el rol
  goToListComentarios() {
    this.navCtrl.navigateForward('/ver-comentarios-general');
  }

  goToListUsuarios() {
    this.navCtrl.navigateForward('/ver-usuarios');
  }

  goToReclamos() {
    this.navCtrl.navigateForward('/reclamo');
  }

  goToVerReclamos() {
    this.navCtrl.navigateForward('/ver-reclamo');
  }

  goToAddSucursal() {
    this.navCtrl.navigateForward('/create-sucursal');
  }

  goToListComentariosSucursal() {
    this.navCtrl.navigateForward('/comentarios-sucursal');
  }

  goToMisComentarios() {
    this.navCtrl.navigateForward('/mis-comentarios');
  }

  goToServicios() {
    this.navCtrl.navigateForward('/servicios');
  }

  goToQuienesSomos() {
    this.navCtrl.navigateForward('/quienes-somos');
  }

  goToAyudaCliente() {
    this.navCtrl.navigateForward('/ayuda-al-cliente');
  }

  goToPersonalizacion() {
    this.navCtrl.navigateForward('/personalizacion');
  }
}
