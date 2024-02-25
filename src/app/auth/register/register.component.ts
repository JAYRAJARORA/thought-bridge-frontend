import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = new User;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Adjust the duration as needed
    });
  }


  onSubmit() {
    this.authService.register(this.user).subscribe(
      response => {
        console.log('Signup successful!', response);
        this.openSnackBar("User Created Successfully", 'Close');
        // Reset form after successful signup
        this.user = new User();
      },
      error => {
        console.error('Signup failed!', error);
        this.openSnackBar("Error in creating User", 'Close');
        console.log(error);
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
