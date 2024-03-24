import { Component } from '@angular/core';
import { Discussion } from '../../shared/models/discussion.model';
import { DiscussionService } from '../discussions.service';
import { CategoryService } from '../../shared/category.service';

@Component({
  selector: 'app-discussion-by-category',
  templateUrl: './discussion-by-category.component.html',
  styleUrl: './discussion-by-category.component.css'
})
export class DiscussionByCategoryComponent {
  discussions: Discussion[] = [];
  categoryIds: string[] = [];

  constructor(private discussionService: DiscussionService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.categorySelected.subscribe((categoryIds: string[]) => {
      this.categoryIds = categoryIds;
      
      if(this.categoryIds.length === 0){
        this.discussions = [];
      } else {
        this.getDiscussionsByCategory();
      }
      
    });
  }

  getDiscussionsByCategory() {
    this.discussionService.getDiscussionsByCategory(this.categoryIds)
      .subscribe(discussions => {        
        this.discussions = discussions;
      });
  }
}
