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
  isLoading = false;

  constructor(private discussionService: DiscussionService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.categorySelected.subscribe((categoryIds: string[]) => {
      this.categoryIds = categoryIds;
      
      if(this.categoryIds.length === 0){
        this.discussions = [];
      } else {
        this.isLoading = true;
        this.getDiscussionsByCategory();
      }
      
    });
  }

  getDiscussionsByCategory() {
    this.categoryService.getDiscussionsByCategory(this.categoryIds)
      .subscribe(discussions => {        
        this.discussions = discussions;
        this.isLoading = false;
        this.discussions.forEach(discussion => {
          if (discussion.content.length > 95) {
            discussion.content = discussion.content.substring(0, 95) + ' ...';
          } else {
            discussion.content = discussion.content;
          }
        });
      });
  }
}
