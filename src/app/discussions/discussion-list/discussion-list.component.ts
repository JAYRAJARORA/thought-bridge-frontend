import { Component, Input } from '@angular/core';
import { DiscussionService } from '../discussions.service';
import { Discussion } from '../../shared/models/discussion.model';
import { CategoryService } from '../../shared/category.service';

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.component.html',
  styleUrl: './discussion-list.component.css'
})
export class DiscussionListComponent {
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
