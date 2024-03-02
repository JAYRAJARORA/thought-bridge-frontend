import { Component, Input } from '@angular/core';
import { DiscussionService } from '../discussions.service';
import { Discussion } from '../../shared/models/discussion.model';
import { CategoryService } from '../../shared/category.service';

@Component({
  selector: 'app-discussion-list-trending',
  templateUrl: './discussion-list-trending.component.html',
  styleUrl: './discussion-list-trending.component.css'
})
export class DiscussionListTrendingComponent {
  discussions: Discussion[] = [];
  category: string = 'Stress';

  constructor(private discussionService: DiscussionService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.categorySelected.subscribe((category: string) => {
      this.category = category;
      this.getDiscussionsByCategory();
    });
  }

  getDiscussionsByCategory() {
    this.discussionService.getDiscussionsByCategory(this.category)
      .subscribe(discussions => {
        console.log('What is coming');
        
        console.log(discussions);
        
        this.discussions = discussions;
      });
  }
}
