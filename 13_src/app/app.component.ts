import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { AuthService } from './services/auth.service'; // ✅ Import AuthService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule], // ✅ Ensure CommonModule is added
  template: `
    <nav>
      <a routerLink="/login" *ngIf="!authService.isLoggedIn()">Login</a> |
      <a routerLink="/register" *ngIf="!authService.isLoggedIn()">Register</a> |
      <a routerLink="/dashboard" *ngIf="authService.isLoggedIn()">Dashboard</a> |
      <a (click)="logout()" *ngIf="authService.isLoggedIn()">Logout</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
