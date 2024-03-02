import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = { username: '', password: '', email: '' };

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Adjust the duration as needed
    });
  }


  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    this.user.username = form.value.username;
    this.user.email = form.value.email;
    this.user.password = form.value.password;

    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Signup successful!', response);
        this.openSnackBar(response.body, 'Close');
      },
      error: (errorResponse) => {
        console.error('Signup failed!', errorResponse);
        if(errorResponse.status == '409') {
          this.openSnackBar(errorResponse.error, 'Close');
        } else {
          this.openSnackBar("Error in creating User", 'Close');
        }
      }
    });

    form.reset();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
