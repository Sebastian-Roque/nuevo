import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ver-reclamo',
  templateUrl: './ver-reclamo.page.html',
  styleUrls: ['./ver-reclamo.page.scss']
})
export class VerReclamoPage {
  searchTerm: string = '';
  isFilterModalOpen = false;

  claims = [
    { user: 'Juan', storeType: 'restaurant', type: 'servicio', description: 'Problema con el servicio', address: 'Dirección 1', comuna: 'Comuna 1', region: 'Región 1', date: new Date(), email: 'juan@example.com', imageUrl: 'assets/images/reclamo1.jpg' },
    { user: 'María', storeType: 'store', type: 'producto', description: 'Producto defectuoso', address: 'Dirección 2', comuna: 'Comuna 2', region: 'Región 2', date: new Date(), email: 'maria@example.com', imageUrl: 'assets/images/reclamo2.jpg' },
    // Agrega más reclamos si es necesario
  ];
  filteredClaims = [...this.claims];

  filter = {
    storeType: '',
    claimType: '',
    dateOrder: ''
  };

  constructor(private location: Location) {}

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
    this.filteredClaims = this.claims
      .filter(claim =>
        (this.searchTerm ? claim.description.toLowerCase().includes(this.searchTerm.toLowerCase()) : true) &&
        (this.filter.storeType ? claim.storeType === this.filter.storeType : true) &&
        (this.filter.claimType ? claim.type === this.filter.claimType : true)
      )
      .sort((a, b) => {
        if (this.filter.dateOrder) {
          return this.filter.dateOrder === 'asc'
            ? a.date.getTime() - b.date.getTime()
            : b.date.getTime() - a.date.getTime();
        }
        return 0;
      });
    this.closeFilterModal();
  }

  clearFilters() {
    this.searchTerm = '';
    this.filter = { storeType: '', claimType: '', dateOrder: '' };
    this.filteredClaims = [...this.claims];
  }
}
