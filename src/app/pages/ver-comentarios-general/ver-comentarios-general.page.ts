import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

interface Comment {
  userName: string;
  type: string;
  description: string;
  address: string;
  comuna: string;
  region: string;
  date: Date;
  rating: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-ver-comentarios-general',
  templateUrl: './ver-comentarios-general.page.html',
  styleUrls: ['./ver-comentarios-general.page.scss'],
})
export class ListaComentariosGeneralPage implements OnInit {
  comments: Comment[] = [
    {
      userName: 'Juan Pérez',
      type: 'Positivo',
      description: 'Excelente servicio!',
      address: 'Av. Principal 123',
      comuna: 'Santiago',
      region: 'Metropolitana',
      date: new Date(),
      rating: 5,
      imageUrl: 'assets/images/user1.jpg'
    },
    {
      userName: 'Ana López',
      type: 'Negativo',
      description: 'El lugar estaba sucio.',
      address: 'Calle Falsa 456',
      comuna: 'Providencia',
      region: 'Metropolitana',
      date: new Date(),
      rating: 2,
      imageUrl: 'assets/images/user2.jpg'
    }
    // Agrega más comentarios según sea necesario
  ];
  
  filteredComments: Comment[] = [];
  searchTerm: string = '';
  isFilterModalOpen: boolean = false;
  filter = {
    comuna: '',
    region: '',
    type: '',
    ratingOrder: ''
  };

  constructor(private location: Location) {}

  ngOnInit() {
    this.filteredComments = this.comments;
  }

  goBack() {
    this.location.back();
  }

  filterComments() {
    this.filteredComments = this.comments.filter(comment =>
      (!this.searchTerm || comment.userName.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.filter.comuna || comment.comuna === this.filter.comuna) &&
      (!this.filter.region || comment.region === this.filter.region) &&
      (!this.filter.type || comment.type === this.filter.type)
    );

    if (this.filter.ratingOrder) {
      this.filteredComments.sort((a, b) =>
        this.filter.ratingOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating
      );
    }
  }

  openFilterModal() {
    this.isFilterModalOpen = true;
  }

  closeFilterModal() {
    this.isFilterModalOpen = false;
  }

  applyFilters() {
    this.filterComments();
    this.closeFilterModal();
  }

  clearFilters() {
    this.filter = {
      comuna: '',
      region: '',
      type: '',
      ratingOrder: ''
    };
    this.searchTerm = '';
    this.filteredComments = this.comments;
    this.closeFilterModal();
  }
}
