import { Component } from '@angular/core';
import { DiscussionService } from '../discussions.service';
import { Discussion } from '../../shared/models/discussion.model';

@Component({
  selector: 'app-discussion-list-trending',
  templateUrl: './discussion-list-trending.component.html',
  styleUrl: './discussion-list-trending.component.css'
})
export class DiscussionListTrendingComponent {
  trendingDiscussions: Discussion[] = [];
  constructor(private discussionService: DiscussionService) { }

  ngOnInit(): void {
      this.discussionService.getTrendingArticles().subscribe((discussions) => {
        this.trendingDiscussions = discussions;
      });
  }
}
