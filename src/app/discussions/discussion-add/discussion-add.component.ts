import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '../discussions.service';
import { Discussion } from '../../shared/models/discussion.model';
import { User } from '../../shared/models/user.model';
import { Category } from '../../shared/models/category.model';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { take } from 'rxjs';
import { CategoryService } from '../../shared/category.service';

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
    likes: ''
  };

  categories: Category[];

  constructor(private discussionService: DiscussionService, 
    private authService: AuthService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<DiscussionAddComponent>) { 
  }

  ngOnInit(): void {
    this.categories = this.categoryService.categories;    
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