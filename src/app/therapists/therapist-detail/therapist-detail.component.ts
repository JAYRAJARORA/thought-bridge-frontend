import { Component, Inject } from '@angular/core';
import { Therapist } from '../../shared/models/therapist.model';
import { TherapistService } from '../therapist.service';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../shared/models/review.model';

@Component({
  selector: 'app-therapist-detail',
  templateUrl: './therapist-detail.component.html',
  styleUrl: './therapist-detail.component.css'
})
export class TherapistDetailComponent {
  therapist: Therapist;
  center: google.maps.LatLngLiteral;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[];

  therapistReviews: Review[] = [];
  showAddReview: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private therapistService: TherapistService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const therapistId = params.get('id');
      if (therapistId) {
        this.loadTherapists(therapistId);
      }
      

      this.therapistService.reviewAdded.subscribe(() => {
        this.loadTherapists(therapistId);
      });
    });
  }

  loadTherapists(therapistId) {
    this.therapistService.getTherapistById(therapistId).subscribe(therapistData => {
      this.therapist = therapistData;
      this.setMapCenter();
    });
  }
  setMapCenter(): void {
    if (this.therapist.address) {
      // Use Geocoding to convert the address to latitude and longitude if necessary
      console.log(this.therapist.address.location.coordinates);
      
      this.center = {
        lng: this.therapist.address.location.coordinates[0],
        lat: this.therapist.address.location.coordinates[1],
      };
      this.markerPositions = [this.center];
    }
  }
  formatPhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
}

}
