import { Component, Inject, OnInit } from '@angular/core';
import { DiscussionService } from '../discussions.service';
import { Discussion } from '../../shared/models/discussion.model';
import { Category } from '../../shared/models/category.model';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { take } from 'rxjs';
import { CategoryService } from '../../shared/category.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-discussion-add',
  templateUrl: './discussion-add.component.html',
  styleUrl: './discussion-add.component.css'
})
export class DiscussionAddComponent implements OnInit {
  discussion: Discussion = {
    id: null,
    category: { name: '' },
    author: { username: '' },
    title: '',
    content: '',
    comments: [],
    upvotes: 0,
    type: ''
  };

  categories: Category[];

  constructor(private discussionService: DiscussionService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<DiscussionAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit(): void {
    this.categories = this.categoryService.categories; 
    this.discussion.type = this.data.discussionType;
    console.log(this.discussion.type);
     
  }
  onSubmit() {
    this.authService.userLoggedIn.pipe(take(1)).subscribe(userData =>  {
      this.discussion.author.username = userData.username;
      this.discussionService.createDiscussion(this.discussion)
      .subscribe({
        next: response => {
          console.log('Discussion created:', response);
          this.discussionService.addDiscussion(response);
          this.dialogRef.close({ successMessage: 'Discussion created successfully!'});
        },
        error: (error) => {
          console.error('Error creating discussion:', error);
          this.dialogRef.close({ errorMessage: 'Failed to create discussion. Please try again later.'});
        }
      });
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
}