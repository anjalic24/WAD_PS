import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // ✅ Ensure FormsModule is included
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    if (!this.email.trim() || !this.password.trim()) {
      alert('Please fill all fields');
      return;
    }

    const success = this.authService.login(this.email.trim(), this.password.trim());
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Login failed! Please check your credentials.');
    }
  }
}
