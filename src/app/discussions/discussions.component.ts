import { Component } from '@angular/core';
import { DiscussionService } from './discussions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrl: './discussions.component.css'
})
export class DiscussionsComponent {
  type: string;
  constructor(private discussionService: DiscussionService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      let type = data.type; // Retrieve the type from route data
      if(this.type == 'articles') {
        this.discussionService.getDiscussions(type).subscribe();
      } else {
        this.discussionService.getDiscussions(type).subscribe();
      }
      this.type = type;
    });    
    
    
    
  }
  
}