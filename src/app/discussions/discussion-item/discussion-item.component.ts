import { Component, Input } from '@angular/core';
import { Discussion } from '../../shared/models/discussion.model';

@Component({
  selector: 'app-discussion-item',
  templateUrl: './discussion-item.component.html',
  styleUrl: './discussion-item.component.css'
})
export class DiscussionItemComponent {
  @Input() discussion: Discussion;
  @Input() index: number;
  
  constructor() {}
}
