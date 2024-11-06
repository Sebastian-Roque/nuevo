import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-sucursal',
  templateUrl: './create-sucursal.page.html',
  styleUrls: ['./create-sucursal.page.scss'],
})
export class CreateSucursalPage implements OnInit {
  sucursalForm!: FormGroup;
  sucursales: any[] = [];

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.sucursalForm = this.formBuilder.group({
      rut: ['', [Validators.required, Validators.pattern('^[0-9]+-[0-9kK]{1}$')]],
      tipo: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion1: ['', Validators.required],
      direccion2: [''],
      direccion3: [''],
      comuna: ['', Validators.required],
      region: ['', Validators.required],
      nombreDueno: ['', Validators.required],
      numeroContacto: ['', [Validators.required, Validators.pattern('^[0-9]{9,10}$')]],
      descripcion: ['', Validators.required],
      logo: ['', Validators.required],
      portada: ['', Validators.required],
      fechaCreacion: ['']  // We will set this automatically
    });
  }

  crearSucursal() {
    if (this.sucursalForm.valid) {
      // Automatically set the creation date
      this.sucursalForm.patchValue({
        fechaCreacion: new Date()
      });

      this.sucursales.push(this.sucursalForm.value);
      this.sucursalForm.reset();
    }
  }

  async confirmarEliminar(sucursal: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar Sucursal',
      message: '¿Estás seguro de que deseas eliminar esta sucursal?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.eliminarSucursal(sucursal)
        }
      ]
    });
    await alert.present();
  }

  eliminarSucursal(sucursal: any) {
    this.sucursales = this.sucursales.filter(s => s !== sucursal);
  }

  modificarSucursal(sucursal: any) {
    this.sucursalForm.patchValue(sucursal);
  }

  actualizarSucursal() {
    const index = this.sucursales.findIndex(s => s.rut === this.sucursalForm.value.rut);
    if (index > -1) {
      this.sucursalForm.patchValue({
        fechaCreacion: new Date() // Automatically update the date on modification
      });
      this.sucursales[index] = this.sucursalForm.value;
      this.sucursalForm.reset();
    }
  }

  goBack() {
    this.location.back();
  }
}
