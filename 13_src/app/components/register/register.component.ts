import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule], // ✅ Ensure FormsModule is included
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    if (!this.name.trim() || !this.email.trim() || !this.password.trim()) {
      alert('Please fill all fields');
      return;
    }

    const success = this.authService.register(
      this.name.trim(),
      this.email.trim(),
      this.password.trim()
    );

    if (success) {
      this.router.navigate(['/login']);
    } else {
      alert('Registration failed! Try again.');
    }
  }
}
