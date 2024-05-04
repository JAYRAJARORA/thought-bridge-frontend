import { Component, Input } from '@angular/core';
import { Review } from '../../../shared/models/review.model';
import { TherapistService } from '../../therapist.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.css'
})
export class ReviewsListComponent {
  therapistId: string;
  userId: string;
  reviews: Review[] = [];
  newReview: Review = new Review();
  existingReviewIndex: number = -1; // Index of the existing review in the reviews array

  constructor(private route: ActivatedRoute, 
    private therapistService: TherapistService,
    private authService: AuthService, 
    private snackBar: MatSnackBar) {}


  ngOnInit(): void {
    // Get the therapistId from the route parameters or parent component
    this.route.parent.params.subscribe(params => {
      this.therapistId = params['id'];
      console.log(this.therapistId);

      this.authService.userLoggedIn.subscribe((userData) => {
        this.userId = userData.userId;
        if (this.therapistId) {
          this.loadReviews();
        }
      });
    });
  }

  loadReviews(): void {
    this.therapistService.getReviewsForTherapist(this.therapistId).subscribe(
      (reviews) => {
        this.reviews = reviews;
              // Find the index of the user's existing review
      this.existingReviewIndex = this.reviews.findIndex(r => r.userId === this.userId);
      // If there's an existing review, set newReview to that review
      if (this.existingReviewIndex !== -1) {
        this.newReview = { ...this.reviews[this.existingReviewIndex] };
      }
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  submitReview(): void {
    if (this.newReview.rating) {
      this.newReview.userId = this.userId;
      // Call service to add review, assume it returns the updated list of reviews
      this.therapistService.addOrUpdateReview(this.therapistId, this.newReview).subscribe(review => {
        
        if (this.existingReviewIndex === -1) {
          this.reviews.push(review);
        } else {
          this.reviews[this.existingReviewIndex] = review;
        }
        this.newReview = new Review(); // Reset the form
        this.openSnackBar(this.existingReviewIndex === -1 ? "Review Added." : "Review Updated.", 'Close');
        
        this.therapistService.reviewAdded.next(true);
      }, error => {
        console.error("Failed to submit review:", error);
      });
    } else {
      this.openSnackBar("Please provide a rating.", 'Close');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Adjust the duration as needed
    });
  }
}
