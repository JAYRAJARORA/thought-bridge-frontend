import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discussion-start',
  templateUrl: './discussion-start.component.html',
  styleUrl: './discussion-start.component.css'
})
export class DiscussionStartComponent {
  discussionType: string;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.discussionType = data.type;
    });
  }
}
