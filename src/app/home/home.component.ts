import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated = false;
  username = '';
  role = '';
  issueTooltip = '';
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userLoggedIn.subscribe((userLoggedIn) => {
      this.isAuthenticated = userLoggedIn ? userLoggedIn.authenticated : false;
      this.username = userLoggedIn ? userLoggedIn.username : '';
      this.role = userLoggedIn ? userLoggedIn.type : '';

      if (this.isAuthenticated) {
        if(this.role == 'user') {
          this.issueTooltip = 'Write an Issue';
        } else {
          this.issueTooltip = 'View Issues';
        }      
      }
    })

    

  }


  redirectToLogin(): void {
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
