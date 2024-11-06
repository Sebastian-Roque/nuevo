import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reclamo',
  templateUrl: './reclamo.page.html',
  styleUrls: ['./reclamo.page.scss'],
})
export class ReclamoPage {
  reclamoForm: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  sucursales: string[] = ['Sucursal 1', 'Sucursal 2', 'Sucursal 3']; // Example branch names

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController
  ) {
    this.reclamoForm = this.fb.group({
      tipoSucursal: ['', Validators.required],
      nombreSucursal: ['', Validators.required], // Now editable
      correo: ['', [Validators.required, Validators.email]],
      tipoReclamo: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Solo se permiten imágenes en formato JPG.');
      this.previewImage = null;
    }
  }

  submitForm() {
    if (this.reclamoForm.valid) {
      const reclamoData = {
        ...this.reclamoForm.value,
        foto: this.previewImage
      };
      console.log('Reclamo:', reclamoData);
      sessionStorage.setItem('reclamo', JSON.stringify(reclamoData));
      this.clearForm();
    }
  }

  clearForm() {
    this.reclamoForm.reset({
      tipoSucursal: '',
      nombreSucursal: '',
      correo: '',
      tipoReclamo: '',
      descripcion: ''
    });
    this.previewImage = null;
  }

  goBack() {
    this.navCtrl.navigateRoot('tabs/configuracion'); 
  }
}
