import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.page.html',
  styleUrls: ['./ver-usuarios.page.scss'],
})
export class VerUsuariosPage implements OnInit {
  users = [
    {
      username: 'juanp',
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      role: 'Administrador',
      lastLogin: new Date('2024-11-01T10:15:00'),
      avatarUrl: 'assets/avatars/juan.png',
    },
    {
      username: 'marial',
      name: 'María López',
      email: 'maria.lopez@example.com',
      role: 'Usuario',
      lastLogin: new Date('2024-11-02T08:45:00'),
      avatarUrl: 'assets/avatars/maria.png',
    },
    {
      username: 'carloss',
      name: 'Carlos Sánchez',
      email: 'carlos.sanchez@example.com',
      role: 'Moderador',
      lastLogin: new Date('2024-11-03T12:00:00'),
      avatarUrl: 'assets/avatars/carlos.png',
    },
    {
      username: 'carl',
      name: 'Carlos Fernandez',
      email: 'carlos@example.com',
      role: 'Moderador',
      lastLogin: new Date('2024-11-03T12:00:00'),
      avatarUrl: 'assets/avatars/carlos.png',
    },
  ];

  filteredUsers = [...this.users];
  searchTerm: string = '';
  isFilterModalOpen: boolean = false;
  filter = {
    role: '',
    dateOrder: ''
  };

  constructor(private location: Location) {}

  ngOnInit() {
    this.filteredUsers = this.users;
  }

  goBack() {
    this.location.back();
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      (!this.searchTerm || user.username.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.filter.role || user.role === this.filter.role)
    );

    if (this.filter.dateOrder) {
      this.filteredUsers.sort((a, b) =>
        this.filter.dateOrder === 'asc'
          ? a.lastLogin.getTime() - b.lastLogin.getTime()
          : b.lastLogin.getTime() - a.lastLogin.getTime()
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
    this.filterUsers();
    this.closeFilterModal();
  }

  clearFilters() {
    this.filter = { role: '', dateOrder: '' };
    this.searchTerm = '';
    this.filteredUsers = this.users;
    this.closeFilterModal();
  }
}
