import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiscussionAddComponent } from './discussion-add/discussion-add.component';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrl: './discussions.component.css'
})
export class DiscussionsComponent {

  constructor(public dialog: MatDialog, private messageService: MessageService) { }

  openCreateDiscussionModal() {
    const dialogRef = this.dialog.open(DiscussionAddComponent, {
      width: '1000px',
      disableClose: true, // Prevent closing the modal by clicking outside
    });
  
    // Subscribe to the afterClosed event to handle the result when the modal is closed
    dialogRef.afterClosed().subscribe(result => {
      if(result.successMessage) {
        this.messageService.showSuccessMessage(result.successMessage);
      }
      if(result.errorMessage) {
        this.messageService.showErrorMessage(result.errorMessage);
      }
    });
  }
  
}