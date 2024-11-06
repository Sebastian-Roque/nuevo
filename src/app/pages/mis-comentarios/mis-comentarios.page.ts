import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mis-comentarios',
  templateUrl: './mis-comentarios.page.html',
  styleUrls: ['./mis-comentarios.page.scss'],
})
export class MisComentariosPage implements OnInit {
  comentarios = [
    { id: 1, titulo: 'Excelente Servicio', descripcion: 'Me encantó la atención al cliente.', fecha: new Date(), type: 'positivo' },
    { id: 2, titulo: 'Muy buena experiencia', descripcion: 'El ambiente era acogedor y el servicio rápido.', fecha: new Date(), type: 'neutral' },
    // Agrega más comentarios con el campo `type`
  ];
  
  filteredComments = [...this.comentarios];
  searchTerm: string = '';
  isFilterModalOpen = false;
  isModalOpen = false;
  comentarioActual: any = null;

  filter = {
    type: '',
    dateOrder: '',
    title: ''
  };

  editCommentForm!: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.editCommentForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  goBack() {
    this.location.back();
  }

  onSearch() {
    this.applyFilters();
  }

  openFilterModal() {
    this.isFilterModalOpen = true;
  }

  closeFilterModal() {
    this.isFilterModalOpen = false;
  }

  applyFilters() {
    this.filteredComments = this.comentarios
      .filter(comentario =>
        (!this.searchTerm || comentario.titulo.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
        (!this.filter.type || comentario.type === this.filter.type) &&
        (!this.filter.title || comentario.titulo.toLowerCase().includes(this.filter.title.toLowerCase()))
      )
      .sort((a, b) => {
        if (this.filter.dateOrder) {
          return this.filter.dateOrder === 'asc'
            ? a.fecha.getTime() - b.fecha.getTime()
            : b.fecha.getTime() - a.fecha.getTime();
        }
        return 0;
      });
    this.closeFilterModal();
  }

  clearFilters() {
    this.searchTerm = '';
    this.filter = { type: '', dateOrder: '', title: '' };
    this.filteredComments = [...this.comentarios];
  }

  modificarComentario(comentario: any) {
    this.comentarioActual = comentario;
    this.editCommentForm.patchValue({
      titulo: comentario.titulo,
      descripcion: comentario.descripcion
    });
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editCommentForm.reset();
  }

  async confirmarEliminar(comentario: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar Comentario',
      message: '¿Estás seguro de que deseas eliminar este comentario?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => this.eliminarComentario(comentario) }
      ]
    });
    await alert.present();
  }

  eliminarComentario(comentario: any) {
    this.comentarios = this.comentarios.filter(c => c.id !== comentario.id);
    this.filteredComments = this.filteredComments.filter(c => c.id !== comentario.id);
  }

  guardarCambios() {
    if (this.comentarioActual) {
      const index = this.comentarios.findIndex(c => c.id === this.comentarioActual.id);
      if (index > -1) {
        this.comentarios[index] = { ...this.comentarios[index], ...this.editCommentForm.value };
      }
      this.applyFilters();
      this.closeModal();
    }
  }
}
