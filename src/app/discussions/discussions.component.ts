import { Component } from '@angular/core';
import { DiscussionService } from './discussions.service';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrl: './discussions.component.css'
})
export class DiscussionsComponent {

  constructor(private discussionService: DiscussionService) {

  }

  ngOnInit() {
    console.log("The first thing that happened");
    
    this.discussionService.getDiscussions().subscribe();
    
    
  }
  
}