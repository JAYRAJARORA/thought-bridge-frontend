import { Component, OnInit } from '@angular/core';
import { Discussion } from '../../shared/models/discussion.model';
import { DiscussionService } from '../discussions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discussions-list',
  templateUrl: './discussions-list.component.html',
  styleUrl: './discussions-list.component.css'
})
export class DiscussionsListComponent implements OnInit {
  discussions: Discussion[] = [];
  
  constructor(private discussionService: DiscussionService) { }

  ngOnInit(): void {
    this.discussionService.getDiscussions()
    .subscribe(discussions => {      
      console.log(discussions);
      this.discussions = discussions;
      this.discussionService.setDiscussions(discussions);
    });
  }
}
