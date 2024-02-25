import { Component } from '@angular/core';
import { Discussion } from '../shared/models/discussion.model';
import { DiscussionService } from './discussions.service';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrl: './discussions.component.css'
})
export class DiscussionsComponent {
  discussions: Discussion[] = [];
  category: string = 'Stress';

  constructor(private discussionService: DiscussionService) { }

  ngOnInit(): void {
    this.discussionService.getDiscussions()
    .subscribe(discussions => {      
      console.log(discussions);
      
      this.discussions = discussions;
    });
  }
}