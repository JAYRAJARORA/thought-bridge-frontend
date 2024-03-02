import { Component } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = new User();

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Adjust the duration as needed
    });
  }

  login() {
    this.authService.login(this.user).subscribe({
      next: (response) => {
        if (response) {
          this.openSnackBar("User Logged In", 'Close');
          let userData = {username: this.user.username, authenticated: true};
          // right now logged in user are handled by boolean value - TODO - handle using Proper jwt token
          this.authService.userLoggedIn.next(userData);
          this.router.navigate(['/']);
          localStorage.setItem('userData', JSON.stringify(userData));
          this.authService.autoLogout(1000000);
        } else {
          
          this.openSnackBar("Invalid Credentials", "Try Again");
        }
      },
      error: (e) => {
        // Handle login error
        this.openSnackBar("Login failed: ", "Close");
        console.log(e);
      }
    });
  }
}
