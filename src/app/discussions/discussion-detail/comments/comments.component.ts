import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../../shared/models/comment.model';
import { AuthService } from '../../../auth/auth.service';
import { take } from 'rxjs';
import { DiscussionService } from '../../discussions.service';
import { MessageService } from '../../../shared/message.service';
import { Discussion } from '../../../shared/models/discussion.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  userType: string;
  newComment: string;
  discussion: Discussion;
  comments: Comment[];

  comment: Comment = {
    content: '',
    author: null,
    dateCreated: null,
    discussionId: null,
  };

  ngOnInit() {
    
    this.discussionService.selectedDiscussion.subscribe((discussion) => {
      this.discussion = discussion;
      this.discussionService.getCommentsForDiscussion(discussion.id).subscribe((comments) => {
        this.comments = comments;
      }); 
      this.authService.userLoggedIn.subscribe((userData) => {
        this.userType = userData.type;
      });
    });
  }
  constructor(
    private authService: AuthService, 
    private discussionService: DiscussionService, 
    private messageService: MessageService,
  ) {}

  addComment(newComment: string) {
    const date = new Date();
    this.authService.userLoggedIn.pipe(take(1)).subscribe(userData => {
      this.comment.author = {username: ''};
      this.comment.author.username = userData.username;
      this.comment.content = newComment;
      // this.comment.dateCreated = date;

      this.discussionService.addCommentToDiscussion(this.discussion.id, this.comment).subscribe({
        next: discussion => {
          this.messageService.showSuccessMessage("Comment Added Successfully")
          this.discussionService.commentAdded.emit();
          this.newComment = '';
          this.comments.push(this.comment);
        },
        error: errorResponse => this.messageService.showErrorMessage("Unable to add comment")
        
      });
    });
  }
}
