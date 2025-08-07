import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  router = inject(Router);

  logout(): void {
    console.log("cerrando sesión");
  }

  isLoggedIn(): boolean {
    // Aquí puedes implementar la lógica para verificar si el usuario está autenticado
    return false; // Por ejemplo, siempre retorna true para simular un usuario autenticado
  }

  isLoginPage(): boolean {
    const route = this.router.url.split('/');
    return !route[1].includes('acceso');
  }

}
