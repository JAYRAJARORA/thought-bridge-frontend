import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticated = false;
  public username: string = '';
  private userLoggedInSub: Subscription;
  public userType = 'user';
  public userId = '';
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.userLoggedInSub = this.authService.userLoggedIn.subscribe((userData) => {
      this.isAuthenticated = userData?.authenticated;
      this.username = userData?.username;
      this.userType = userData?.type;
      this.userId = userData?.userId;
    })
  }
  ngOnDestroy(): void {
    this.userLoggedInSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
 
  
}
