import { Component } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = new User();

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Adjust the duration as needed
    });
  }

  login() {
    this.authService.login(this.user).subscribe(
      response => {
        if(response) {
          this.openSnackBar("User Logged In", 'Close');
          this.router.navigate(['/']);
        } else {
          this.openSnackBar("Invalid Credentials", "Try Again");
        }
      },
      error => {
        // Handle login error
        this.openSnackBar("Login failed: ", "Close");
        console.log(error);
        

      }
    );
  }
}
