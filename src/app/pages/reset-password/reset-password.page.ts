import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  username: string = '';
  securityQuestion: string = '';
  securityAnswer: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  isUserValidated: boolean = false;
  isSecurityValidated: boolean = false;

  newPasswordType: string = 'password';
  newPasswordIcon: string = 'eye-off';
  confirmPasswordType: string = 'password';
  confirmPasswordIcon: string = 'eye-off';

  constructor(
    private userService: UserService, 
    private toastController: ToastController, 
    private navCtrl: NavController
  ) {}

  validateInputs() {
    if (this.username.trim() === '') {
      this.presentToast('Por favor, ingresa tu nombre de usuario.');
      return;
    }
    this.getSecurityQuestion();
  }

  getSecurityQuestion() {
    this.userService.getUserByUsername(this.username).subscribe((user) => {
      if (user) {
        this.securityQuestion = this.camelCaseToNormalText(user.PreguntaSeguridad);
        this.isUserValidated = true;
        this.presentToast('Pregunta de seguridad obtenida. Ingresa tu respuesta.');
      } else {
        this.presentToast('Usuario no encontrado.');
        this.isUserValidated = false;
      }
    });
  }

  validateSecurityAnswer() {
    if (!this.isUserValidated) {
      this.presentToast('Primero debes obtener la pregunta de seguridad.');
      return;
    }

    if (this.securityAnswer.trim() === '') {
      this.presentToast('Por favor, ingresa la respuesta de seguridad.');
      return;
    }

    this.userService.validateSecurityQuestion(this.username, this.securityAnswer).subscribe((isValid) => {
      if (isValid) {
        this.isSecurityValidated = true;
        this.presentToast('Respuesta de seguridad correcta. Ahora puedes cambiar tu contraseña.');
      } else {
        this.presentToast('Respuesta de seguridad incorrecta.');
        this.isSecurityValidated = false;
      }
    });
  }

  resetPassword() {
    if (!this.isSecurityValidated) {
      this.presentToast('Primero valida la respuesta de seguridad.');
      return;
    }

    if (this.newPassword.trim() === '' || this.confirmPassword.trim() === '') {
      this.presentToast('Por favor, ingresa y confirma la nueva contraseña.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.presentToast('Las contraseñas no coinciden.');
      return;
    }

    this.userService.updatePassword(this.username, this.newPassword)
      .then(() => {
        this.presentToast('Contraseña actualizada con éxito.');
        this.clearForm();
        this.goToLogin();
      })
      .catch((error) => {
        this.presentToast('Error al actualizar la contraseña.');
        console.error('Error al actualizar la contraseña:', error);
      });
  }

  toggleNewPasswordVisibility() {
    this.newPasswordType = this.newPasswordType === 'password' ? 'text' : 'password';
    this.newPasswordIcon = this.newPasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordType = this.confirmPasswordType === 'password' ? 'text' : 'password';
    this.confirmPasswordIcon = this.confirmPasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  clearForm() {
    this.username = '';
    this.securityQuestion = '';
    this.securityAnswer = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.isUserValidated = false;
    this.isSecurityValidated = false;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  camelCaseToNormalText(camelCaseText: string): string {
    return camelCaseText.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  }

  goToLogin() {
    this.navCtrl.navigateRoot('/login'); 
  }
}
