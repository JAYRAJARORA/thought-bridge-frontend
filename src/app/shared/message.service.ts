import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) { }

  showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      panelClass: ['success-snackbar'] 
    });
  }

  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      panelClass: ['error-snackbar']
    });
  }
}
