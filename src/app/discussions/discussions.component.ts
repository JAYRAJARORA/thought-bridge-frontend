import { Component } from '@angular/core';
import { DiscussionService } from './discussions.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrl: './discussions.component.css'
})
export class DiscussionsComponent {
  type: string;
  constructor(private discussionService: DiscussionService, 
    private authService: AuthService, 
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      let type = data.type; // Retrieve the type from route data
      if(this.type == 'articles') {
        this.discussionService.getDiscussions(type).subscribe();
      } else {
        this.authService.userLoggedIn.subscribe((userData) => {
          if(userData.type == 'therapist') {
            this.discussionService.getDiscussions(type).subscribe();
          } else {
            this.discussionService.getDiscussions(type, userData.userId).subscribe();
          }
          
        })
        
      }
      this.type = type;
    });
  }
}