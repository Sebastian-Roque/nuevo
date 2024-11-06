import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comentarios-sucursal',
  templateUrl: './comentarios-sucursal.page.html',
  styleUrls: ['./comentarios-sucursal.page.scss'],
})
export class ComentariosSucursalPage implements OnInit {
  searchTerm: string = '';
  isFilterModalOpen = false;
  comments = [
    { userName: 'Juan', type: 'positivo', description: 'Buen servicio', address: 'Dirección 1', comuna: 'Comuna 1', region: 'Región 1', date: new Date(), rating: 5, imageUrl: '' },
    { userName: 'María', type: 'negativo', description: 'Mal servicio', address: 'Dirección 2', comuna: 'Comuna 2', region: 'Región 2', date: new Date(), rating: 2, imageUrl: '' },
    // Agrega más comentarios si es necesario
  ];
  filteredComments = [...this.comments];

  filter = {
    type: '',
    dateOrder: '',
    ratingOrder: ''
  };

  constructor(private modalCtrl: ModalController, private location: Location) {}

  ngOnInit() {}

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
    this.filteredComments = this.comments
      .filter(comment =>
        (this.searchTerm ? comment.description.toLowerCase().includes(this.searchTerm.toLowerCase()) : true) &&
        (this.filter.type ? comment.type === this.filter.type : true)
      )
      .sort((a, b) => {
        if (this.filter.dateOrder) {
          return this.filter.dateOrder === 'asc'
            ? a.date.getTime() - b.date.getTime()
            : b.date.getTime() - a.date.getTime();
        }
        if (this.filter.ratingOrder) {
          return this.filter.ratingOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        }
        return 0;
      });
    this.closeFilterModal();
  }

  clearFilters() {
    this.searchTerm = '';
    this.filter = { type: '', dateOrder: '', ratingOrder: '' };
    this.filteredComments = [...this.comments];
  }

  goBack() {
    this.location.back();
  }
}
