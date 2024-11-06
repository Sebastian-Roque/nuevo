import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SucursalService } from '../../services/sucursal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.page.html',
  styleUrls: ['./sucursal.page.scss'],
})
export class SucursalPage implements OnInit {
  sucursales: any[] = [];
  filteredSucursales: any[] = [];
  searchTerm: string = '';
  sortOrder: string = '';
  sucursalesSubscription: Subscription | null = null;
  isFilterModalOpen: boolean = false;

  constructor(private sucursalService: SucursalService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadSucursales();
  }

  ionViewWillEnter() {
    this.loadSucursales();
  }

  ngOnDestroy() {
    if (this.sucursalesSubscription) {
      this.sucursalesSubscription.unsubscribe();
    }
  }

  loadSucursales() {
    this.sucursalesSubscription = this.sucursalService.getSucursales(this.sortOrder).subscribe((data) => {
      this.sucursales = data;
      this.filteredSucursales = this.applySearchFilter();
    });
  }

  filterSucursales(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filteredSucursales = this.applySearchFilter();
  }

  applySearchFilter() {
    if (!this.searchTerm) return this.sucursales;
    return this.sucursales.filter((sucursal) =>
      sucursal.nombre.toLowerCase().includes(this.searchTerm) ||
      sucursal.direccion.toLowerCase().includes(this.searchTerm)
    );
  }

  onSortChange(event: any) {
    this.sortOrder = event.detail.value;
    this.loadSucursales();
  }

  applyFilters() {
    this.filteredSucursales = this.applySearchFilter();
    this.isFilterModalOpen = false;
  }

  clearFilter() {
    this.searchTerm = '';
    this.sortOrder = '';
    this.loadSucursales();
    this.isFilterModalOpen = false;
  }

  openFilterModal() {
    this.isFilterModalOpen = true;
  }

  closeFilterModal() {
    this.isFilterModalOpen = false;
  }

  goToVerPerfil(sucursalId: number) {
    this.navCtrl.navigateForward(`/ver-sucursal/${sucursalId}`);
  }
}
