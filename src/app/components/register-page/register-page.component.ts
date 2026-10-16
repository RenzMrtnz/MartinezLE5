import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  userName = '';
  firstName = '';
  lastName = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const user = {
      userName: this.userName,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: () => {
        this.errorMessage = 'Registration failed.';
      }
    });
  }
}
