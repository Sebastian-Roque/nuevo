// src/app/pages/login/login.page.ts

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  loginError: string = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}

  // Método para iniciar sesión
  async login() {
    try {
      await this.authService.login(this.email, this.password);
      await this.router.navigate(['/tabs/home']);
    } catch (error) {
      console.error('Error en inicio de sesión', error);
      this.loginError = 'Credenciales incorrectas. Intenta de nuevo.';
    }
  }

  // Método para mostrar y ocultar la contraseña
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  // Método para navegar a la página de registro
  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Método para navegar a la página de restablecer contraseña
  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  // Método para mostrar mensajes
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  goToHome() {
    this.router.navigate(['/tabs/home']);
  }
}
