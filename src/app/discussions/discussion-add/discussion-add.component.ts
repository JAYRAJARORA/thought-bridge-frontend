import { Component } from '@angular/core';
import { DiscussionService } from '../discussions.service';
import { Discussion } from '../../shared/models/discussion.model';
import { User } from '../../shared/models/user.model';
import { Category } from '../../shared/models/category.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-discussion-add',
  templateUrl: './discussion-add.component.html',
  styleUrl: './discussion-add.component.css'
})
export class DiscussionAddComponent {
  discussion: Discussion = new Discussion;

  constructor(private discussionService: DiscussionService, private dialogRef: MatDialogRef<DiscussionAddComponent>) { 
    this.discussion = new Discussion();
    this.discussion.category = new Category();
    this.discussion.author = new User();
  }

  onSubmit() {

    this.discussionService.createDiscussion(this.discussion)
      .subscribe(
        response => {
          console.log('Discussion created:', response);
          this.discussionService.addDiscussion(this.discussion);
          this.dialogRef.close({ successMessage: 'Discussion created successfully!'});
        },
        error => {
          console.error('Error creating discussion:', error);
          this.dialogRef.close({ errorMessage: 'Failed to create discussion. Please try again later.'});
        }
      );
      
  }

  closeModal() {
    this.dialogRef.close();
  }
}