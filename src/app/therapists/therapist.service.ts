import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';


import { Therapist } from '../shared/models/therapist.model';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';
import { Review } from '../shared/models/review.model';

@Injectable({
  providedIn: 'root'
})
export class TherapistService { 
  reviewAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
  baseUrl: string;
  constructor(private http: HttpClient) { 
    this.baseUrl = environment.domain;
  }

  getTherapists() {
    return this.http.get<Therapist[]>(`${this.baseUrl}/therapists`);
  }

  getTherapistsNearby(lat: number, lng: number, radius: number): Observable<Therapist[]> {
    return this.http.get<Therapist[]>(
      `${this.baseUrl}/therapists/nearby?latitude=${lat}&longitude=${lng}&radius=${radius}`
      );
  }

  getTherapistById(id: string) {
    return this.http.get<Therapist>(`${this.baseUrl}/therapists/${id}`);
  }

  addOrUpdateReview(therapistId: string, review: Review) {
    return this.http.post<Review>(`${this.baseUrl}/therapists/${therapistId}/reviews`, review);
  }

  getReviewsForTherapist(therapistId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/therapists/${therapistId}/reviews`);
  }
}
