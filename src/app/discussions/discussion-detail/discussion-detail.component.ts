import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../discussions.service';
import { Discussion } from '../../shared/models/discussion.model';

@Component({
  selector: 'app-discussion-detail',
  templateUrl: './discussion-detail.component.html',
  styleUrl: './discussion-detail.component.css'
})
export class DiscussionDetailComponent implements OnInit {
  discussion: Discussion = {
    id: '',
    title: '',
    content: '',
    author: null,
    comments: [],
    upvotes: 0,
    category: null
  };

  constructor(private route: ActivatedRoute, 
    private discussionService: DiscussionService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.discussionService.findDiscussionById(params['id']).subscribe((discussion: Discussion) => {
        this.discussion = discussion;
      });
    });
    this.discussionService.commentAdded.subscribe(() => this.discussion.comments.length++);
  }

}
