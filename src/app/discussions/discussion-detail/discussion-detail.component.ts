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
  hasUserUpvoted = false;
  userId = '';
  discussion: Discussion = {
    id: '',
    title: '',
    content: '',
    author: null,
    upvotes: 0,
    category: null,
    type: '',
    comments: 0
  };

  constructor(private route: ActivatedRoute, 
    private discussionService: DiscussionService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.discussionService.findDiscussionById(params['id']).subscribe((discussion: Discussion) => {
        this.discussion = discussion;
        console.log(this.discussion);
        
        
        const userDataObj = JSON.parse(localStorage.getItem('userData'));
        this.userId = userDataObj.userId;
        this.discussionService.checkIfUserHasUpvoted(this.discussion.id, this.userId).subscribe((upvote) => {
          if(upvote) {
            this.hasUserUpvoted = true;
          } else {
            this.hasUserUpvoted = false;
          }
        });
      });
    });
    // this.discussionService.commentAdded.subscribe(() => this.discussion.comments.length++);

  }

  toggleUpvoteDiscussion() {
    this.discussionService.toggleUpvoteOnDiscussion(this.discussion.id, this.userId).subscribe((discussion) => {
      this.discussion = discussion;
      this.hasUserUpvoted = !this.hasUserUpvoted;
      // this.hasUserUpvoted = this.discussion.upvoteDetail?.filter(userData => userData.user.username == this.username)?.length > 0;
    });
  }
}
