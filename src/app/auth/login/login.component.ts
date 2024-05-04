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
  userType: string = 'user';
  user: User = {username: ''  , password: '', email: '', licenseNumber: ''};

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Adjust the duration as needed
    });
  }

  login() {
    console.log("test");
    
    console.log(this.userType);
    
    this.authService.login(this.user, this.userType).subscribe({
      next: (response) => {
        console.log(response);
        
        if (response) {
          this.openSnackBar("User Logged In", 'Close');
          let userData = {username: response.username, type: response.role, authenticated: true, userId: response.userId};
          console.log(userData);
          
          // right now logged in user are handled by boolean value - TODO - handle using Proper jwt token
          this.authService.userLoggedIn.next(userData);
          this.router.navigate(['/']);
          localStorage.setItem('userData', JSON.stringify(userData));
          //this.authService.autoLogout(1000000);
        } else {
          this.openSnackBar("Something went wrong", "Try Again");
        }
      },
      error: (e) => {
        // Handle login error
        if(e.status === 401) {
        this.openSnackBar("Invalid Credentials", "Try Again");
        }
        console.log(e);
      }
    });

    
  }
  updateUserType(index: number) {
    this.userType = index === 1 ? 'therapist' : 'user';
  }

}
