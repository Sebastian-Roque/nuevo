import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  comentarioForm!: FormGroup;
  formSubmitted: boolean = false;
  sucursales: any[] = [];
  selectedImage: any = null;
  selectedSucursal: any = null;
  regiones: string[] = [];
  comunas: string[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private comentarioService: ComentarioService
  ) {}

  ngOnInit() {
    this.comentarioForm = this.formBuilder.group({
      tipoSucursal: ['', Validators.required],
      sucursal: ['', Validators.required],
      region: [{ value: '', disabled: true }, Validators.required],
      comuna: [{ value: '', disabled: true }, Validators.required],
      direccion: [{ value: '', disabled: true }, Validators.required],
      fechaHora: ['', Validators.required],
      tipoQueja: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      evaluacion: [3, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
    this.loadSucursales();
  }

  loadSucursales() {
    this.sucursales = [
      { id: 1, nombre: 'Tienda A', region: 'Región A', comuna: 'Comuna A', direcciones: ['Dirección A1', 'Dirección A2', 'Dirección A3'] },
      { id: 2, nombre: 'Tienda B', region: 'Región B', comuna: 'Comuna B', direcciones: ['Dirección B1', 'Dirección B2', 'Dirección B3'] }
    ];
  }

  onSucursalChange(event: any) {
    const sucursalId = event.value;
    this.selectedSucursal = this.sucursales.find(s => s.id === sucursalId);
    if (this.selectedSucursal) {
      this.regiones = [this.selectedSucursal.region];
      this.comunas = [this.selectedSucursal.comuna];
      this.comentarioForm.patchValue({
        region: this.selectedSucursal.region,
        comuna: this.selectedSucursal.comuna,
        direccion: '' // Resetea el campo de dirección para seleccionar una de las opciones disponibles
      });
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      this.snackBar.open('Solo se permiten imágenes en formato JPG o PNG', 'Cerrar', { duration: 3000 });
      this.clearImage();
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.comentarioForm.valid) {
      const comentario = {
        ...this.comentarioForm.value,
        fecha: new Date(),
        imagenUrl: this.selectedImage,
        usuario: 'Anónimo' // Aquí puedes añadir lógica para el usuario si es necesario
      };
      this.saveComment(comentario);
    } else {
      this.snackBar.open('Por favor, complete todos los campos correctamente', 'Cerrar', { duration: 3000 });
    }
  }

  saveComment(comentario: any) {
    this.comentarioService.addCommentToSucursal(this.selectedSucursal.id.toString(), comentario);
    this.snackBar.open('Comentario enviado con éxito', 'Cerrar', { duration: 3000 });
    this.clearForm();
  }

  clearForm() {
    this.comentarioForm.reset();
    this.formSubmitted = false;
    this.selectedImage = null;
    this.selectedSucursal = null;
  }

  clearImage() {
    this.selectedImage = null;
  }
}
