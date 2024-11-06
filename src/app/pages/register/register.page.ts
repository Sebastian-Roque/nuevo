// src/app/pages/register/register.page.ts

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService, Usuario } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  securityQuestion: string = '';
  securityAnswer: string = '';
  userType: string = 'usuario'; // Default role
  businessName: string = '';
  businessAddress: string = '';
  businessPhone: string = '';

  emailExists: boolean = false;
  usernameExists: boolean = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastController: ToastController,
    private router: Router
  ) {}

  async checkEmail() {
    if (this.email) {
      this.emailExists = await firstValueFrom(this.userService.isEmailTaken(this.email));
    }
  }

  async checkUsername() {
    if (this.username) {
      this.usernameExists = await firstValueFrom(this.userService.isUsernameTaken(this.username));
    }
  }

  isFormValid(): boolean {
    return !!(
      this.firstName &&
      this.email &&
      this.password &&
      !this.emailExists &&
      !this.usernameExists &&
      (this.userType === 'usuario' || (this.businessName && this.businessAddress && this.businessPhone))
    );
  }

  async register() {
    if (!this.isFormValid()) {
      this.presentToast('Por favor, completa todos los campos.');
      return;
    }

    try {
      // Primero registra al usuario en Firebase Authentication
      await this.authService.register(this.email, this.password, this.userType);

      // Luego, guarda la información adicional del usuario en Firestore
      const usuario: Usuario = {
        Apellido: this.lastName,
        Correo: this.email,
        Nombre: this.firstName,
        NombreUsuario: this.username,
        Password: this.password,
        PreguntaSeguridad: this.securityQuestion,
        RespuestaSeguridad: this.securityAnswer,
        Rol: this.userType,
        NombreEmpresa: this.userType === 'empresario' ? this.businessName : undefined,
        DireccionEmpresa: this.userType === 'empresario' ? this.businessAddress : undefined,
        TelefonoEmpresa: this.userType === 'empresario' ? this.businessPhone : undefined,
        id: '', // ID generado por Firestore
      };

      await this.userService.addUsuario(usuario);
      this.presentToast('Usuario registrado con éxito.');
      this.clearForm();
      this.router.navigate(['/login']);
    } catch (error) {
      this.presentToast('Error al registrar el usuario.');
      console.error('Error al registrar el usuario:', error);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  clearForm() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.username = '';
    this.password = '';
    this.securityQuestion = '';
    this.securityAnswer = '';
    this.userType = 'usuario';
    this.businessName = '';
    this.businessAddress = '';
    this.businessPhone = '';
    this.emailExists = false;
    this.usernameExists = false;
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  cancel() {
    this.clearForm();
    this.router.navigate(['/login']);
  }
}
