import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ayuda-al-cliente',
  templateUrl: './ayuda-al-cliente.page.html',
  styleUrls: ['./ayuda-al-cliente.page.scss'],
})
export class AyudaAlClientePage implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private location: Location,
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  goBack() {
    this.location.back();
  }

  sendMessage() {
    if (this.contactForm.valid) {
      console.log("Mensaje enviado:", this.contactForm.value);
      this.contactForm.reset();
    }
  }

  clearForm() {
    this.contactForm.reset();
  }

  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }
}
