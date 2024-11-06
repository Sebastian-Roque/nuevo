import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {
  servicioForm: FormGroup;
  servicios = [
    {
      nombre: 'Consultoría de Negocios',
      descripcion: 'Asesoría especializada para optimizar y hacer crecer tu negocio.'
    },
    {
      nombre: 'Desarrollo Web',
      descripcion: 'Diseño y desarrollo de sitios web modernos y responsivos.'
    },
    {
      nombre: 'Marketing Digital',
      descripcion: 'Estrategias de marketing digital para mejorar tu presencia en línea.'
    }
  ];

  constructor(private formBuilder: FormBuilder, private location: Location) {
    // Inicializamos el formulario
    this.servicioForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.servicioForm.valid) {
      this.servicios.push(this.servicioForm.value);
      this.servicioForm.reset();
    }
  }

  goBack() {
    this.location.back();
  }
}
