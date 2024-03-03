import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../discussions.service';
import { Discussion } from '../../shared/models/discussion.model';
import { Comment } from '../../shared/models/comment.model';
import { AuthService } from '../../auth/auth.service';
import { take } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { MessageService } from '../../shared/message.service';

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
    comments: null,
    likes: '',
    category: null
  };
  comment: Comment = {
    content: '',
    author: null,
    dateCreated: null,
  };

  newComment: string;
  constructor(private route: ActivatedRoute, 
    private discussionService: DiscussionService, 
    private authService: AuthService, 
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.discussionService.findDiscussionById(params['id']).subscribe((discussion: Discussion) => {
        this.discussion = discussion;
        this.newComment = '';
      });
    });
  }

  addComment(newComment: string) {
    const date = new Date();
    this.authService.userLoggedIn.pipe(take(1)).subscribe(userData => {
      this.comment.author = new User();
      this.comment.author.username = userData.username;
      this.comment.content = newComment;
      // this.comment.dateCreated = date;

      this.discussionService.addCommentToDiscussion(this.discussion.id, this.comment).subscribe({
        next: discussion => {
          this.discussion = discussion;
          this.messageService.showSuccessMessage("Comment Added Successfully")
          this.newComment = '';
        },
        error: errorResponse => this.messageService.showErrorMessage("Unable to add comment")
        
      });

      
    });
  }



}
