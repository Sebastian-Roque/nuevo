import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SucursalService } from '../../services/sucursal.service';
import { ComentarioService } from '../../services/comentario.service';
import { NavController } from '@ionic/angular';


declare const google: any; // Declaración para que TypeScript reconozca la biblioteca de Google Maps

@Component({
  selector: 'app-ver-sucursal',
  templateUrl: './ver-sucursal.page.html',
  styleUrls: ['./ver-sucursal.page.scss'],
})
export class VerSucursalPage implements OnInit {
  sucursal: any = {};
  comentarios: any[] = [];
  filteredComentarios: any[] = [];
  filterType: string = 'fecha'; // Filtro inicial

  constructor(
    private route: ActivatedRoute,
    private sucursalService: SucursalService,
    private comentarioService: ComentarioService,
    private navCtrl: NavController
  ) {}

 // Dentro de la clase VerSucursalPage:
ngOnInit() {
  this.loadSucursalAndComments();
  
   // Suscribirse a las actualizaciones de comentarios
  this.comentarioService.getComentariosUpdates().subscribe(() => {
    const sucursalId = this.route.snapshot.paramMap.get('id') || '';
    this.loadComentarios(sucursalId); // Actualizar comentarios para la sucursal actual
  });
}

  ionViewWillEnter() {
    this.loadSucursalAndComments(); // Actualiza los comentarios cuando se ingresa a la página
  }

  loadSucursalAndComments() {
    const sucursalId = this.route.snapshot.paramMap.get('id') || '';
    const sucursalIdNumber = Number(sucursalId);

    if (!isNaN(sucursalIdNumber)) {
      this.sucursalService.getSucursalById(sucursalIdNumber).subscribe((data: any) => {
        this.sucursal = data;
      });

      this.loadComentarios(sucursalId); // Cargar los comentarios para la sucursal
    }
  }

  loadComentarios(sucursalId: string) {
    this.comentarioService.getComentariosBySucursalId(sucursalId).subscribe((data: any) => {
      this.comentarios = data;
      this.applyCommentFilter(); // Aplica el filtro inicial
    });
  }

  // Filtro para los comentarios
  applyCommentFilter() {
    if (this.filterType === 'fecha') {
      this.filteredComentarios = [...this.comentarios].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    } else if (this.filterType === 'evaluacion') {
      this.filteredComentarios = [...this.comentarios].sort((a, b) => b.evaluacion - a.evaluacion);
    }
  }

  initializeMap() {
    const mapOptions = {
      center: new google.maps.LatLng(this.sucursal.latitud, this.sucursal.longitud),
      zoom: 15,
    };

    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    new google.maps.Marker({
      position: { lat: this.sucursal.latitud, lng: this.sucursal.longitud },
      map: map,
      title: this.sucursal.nombre,
    });
  }
    // Método para navegar a la pantalla de login
    goToHome() {
      this.navCtrl.navigateRoot('tabs/home'); 
    }
}
