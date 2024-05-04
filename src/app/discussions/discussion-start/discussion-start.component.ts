import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../discussions.service';
import { Discussion } from '../../shared/models/discussion.model';

@Component({
  selector: 'app-discussion-start',
  templateUrl: './discussion-start.component.html',
  styleUrl: './discussion-start.component.css'
})
export class DiscussionStartComponent {
  discussionType: string;
  discussions: Discussion[];
  constructor(private route: ActivatedRoute, private discussionService: DiscussionService) {}
  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.discussionType = data.type;
      this.discussionService.discussionsChanged.subscribe((discussions) => {
        this.discussions = discussions;
      });
    });
  }
}
