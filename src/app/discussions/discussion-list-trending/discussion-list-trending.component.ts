import { Component } from '@angular/core';
import { DiscussionService } from '../discussions.service';
import { Discussion } from '../../shared/models/discussion.model';

@Component({
  selector: 'app-discussion-list-trending',
  templateUrl: './discussion-list-trending.component.html',
  styleUrl: './discussion-list-trending.component.css'
})
export class DiscussionListTrendingComponent {
  trendingDiscussions: Discussion[] = [];
  constructor(private discussionService: DiscussionService) { }

  isLoading: boolean = false;


  ngOnInit(): void {
    this.isLoading = true;
      this.discussionService.getTrendingArticles().subscribe((discussions) => {
        this.isLoading = false;
        this.trendingDiscussions = discussions;
        this.trendingDiscussions.forEach(discussion => {
          if (discussion.content.length > 95) {
            discussion.content = discussion.content.substring(0, 95) + ' ...';
          } else {
            discussion.content = discussion.content;
          }
        });
  });
  }


  isTitleMultipleLines(title: string): boolean {
    // Calculate the number of lines based on the height of the title element
    const titleElement = document.createElement('div');
    titleElement.innerHTML = title;
    titleElement.style.position = 'absolute';
    titleElement.style.visibility = 'hidden';
    titleElement.style.height = 'auto';
    titleElement.style.width = 'auto';
    titleElement.style.whiteSpace = 'nowrap';
    document.body.appendChild(titleElement);
    const isMultipleLines = titleElement.offsetHeight > 3 * parseFloat(getComputedStyle(titleElement).lineHeight);
    document.body.removeChild(titleElement);
    return isMultipleLines;
  }
  
}


