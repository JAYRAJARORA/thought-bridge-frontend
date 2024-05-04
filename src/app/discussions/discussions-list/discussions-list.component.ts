import { Component, Input, OnInit } from '@angular/core';
import { Discussion } from '../../shared/models/discussion.model';
import { DiscussionService } from '../discussions.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from '../../shared/message.service';
import { DiscussionAddComponent } from '../discussion-add/discussion-add.component';

@Component({
  selector: 'app-discussions-list',
  templateUrl: './discussions-list.component.html',
  styleUrl: './discussions-list.component.css'
})
export class DiscussionsListComponent implements OnInit {
  discussions: Discussion[] = [];
  isLoading = false;
  @Input("discussionType") discussionType: string = 'articles';
  
  constructor(public dialog: MatDialog, private discussionService: DiscussionService, private messageService: MessageService) { }

  openCreateDiscussionModal() {
    const dialogRef = this.dialog.open(DiscussionAddComponent, {
      width: '1000px',
      disableClose: true, // Prevent closing the modal by clicking outside,
      data: { discussionType: this.discussionType } 
    });
  
    // Subscribe to the afterClosed event to handle the result when the modal is closed
    dialogRef.afterClosed().subscribe(result => {
      if(result?.successMessage) {
        this.messageService.showSuccessMessage(result.successMessage);
      }
      if(result?.errorMessage) {
        this.messageService.showErrorMessage(result.errorMessage);
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.discussionService.discussionsChanged.subscribe((discussions) => {
      this.discussions = discussions;
      console.log('--------------');
      
      console.log(this.discussions);
      this.isLoading = false;
    })
  }
}
