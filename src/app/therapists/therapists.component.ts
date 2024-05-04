import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Therapist } from '../shared/models/therapist.model';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/models/category.model';
import { TherapistService } from './therapist.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-therapists',
  templateUrl: './therapists.component.html',
  styleUrl: './therapists.component.css'
})
export class TherapistsComponent implements AfterViewInit, OnInit {
  @ViewChild('locationInput') locationInput: ElementRef;
  therapists: any[] = [];
  filteredTherapists: Therapist[] = [];
  selectedCategoriesFilter = [];
  specializationFilter: string = '';
  locationFilter: string = '';
  ratingFilter: number = -1;
  allCategories: Category[];
  customLocationFilter: string = '';
  currentCoords: { lat: number, lng: number } | null = null;
  radiusFilter: number = 25;
  isLoading = false;

  constructor(private therapistService: TherapistService, 
    private categoryService: CategoryService,
    private router: Router
    ) { }

  ngOnInit(): void {
    
    this.fetchTherapists();
    this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
      this.allCategories = categories;
    });
  }

  ngAfterViewInit() {
    console.log(this.locationInput);
    
    const autocomplete = new google.maps.places.Autocomplete(this.locationInput.nativeElement);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.error("Autocomplete's returned place contains no geometry");
        return;
      }
      this.customLocationFilter = place.formatted_address;
      this.currentCoords = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      console.log(this.currentCoords);
      
      this.applyFilters();
    });
  }

  useCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(this.currentCoords);
        this.displayLocation(position.coords.latitude, position.coords.longitude);
      }, (error) => {
        console.error('Geolocation failed: ', error);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  displayLocation(latitude: number, longitude: number): void {
    // Optionally convert latitude and longitude to a readable address using a geocoding service
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: latitude, lng: longitude };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        this.customLocationFilter = results[0].formatted_address;
      } else {
        this.customLocationFilter = `Lat: ${latitude}, Lng: ${longitude}`;
      }
    });
  }

  fetchTherapists() {
    this.isLoading = true;
    this.therapistService.getTherapists().subscribe(
      (therapists: any[]) => {
        this.isLoading = false;
        this.therapists = therapists;
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching therapists:', error);
      }
    );
  }

  fetchTherapistsByLocation() {
    if (this.currentCoords) {
      this.therapistService.getTherapistsNearby(this.currentCoords.lat, this.currentCoords.lng, this.radiusFilter)
        .subscribe(
          (therapists: Therapist[]) => {
            this.filteredTherapists = therapists;
          },
          error => {
            console.error('Error fetching nearby therapists:', error);
          }
        );
    } else {
      alert('No location specified. Please enter a location or use the current location.');
    }
  }

  applyFilters() {
    this.filteredTherapists = this.therapists.filter((therapist: Therapist) => {
      return (
        this.filterByCategory(therapist) &&
        this.filterBySpecialization(therapist) &&
        this.filterByLocation(therapist) && 
        this.filterByRating(therapist)
      );
    });
  }

  filterByCategory(therapist: Therapist): boolean {
    return this.selectedCategoriesFilter.length === 0 || // If no categories selected, return true for all therapists
    therapist.categories.some(category => this.selectedCategoriesFilter.includes(category?.name));
  }

  filterBySpecialization(therapist: Therapist): boolean {
    if (!this.specializationFilter) return true;
    return therapist.specialization.toLowerCase().includes(this.specializationFilter.toLowerCase());
  }

  filterByLocation(therapist: Therapist): boolean {
    if (!this.locationFilter) return true;
    const location = therapist.address.formattedAddress;
    return location.toLowerCase().includes(this.locationFilter.toLowerCase());
  }

  filterByRating(therapist: Therapist) {
    if (this.ratingFilter == 0) {
      return therapist.avgRating == 0; // Show all unrated therapists
    } else {
      return therapist.avgRating >= this.ratingFilter; // Return true if therapist rating is greater than or equal to the selected rating filter
    }
  }

  getFormattedCategories(therapist: Therapist): string {
    return therapist.categories.map(category => category?.name).join(', ');
  }

  clearFilters() {
    this.selectedCategoriesFilter = []; // Clear selected categories
    this.specializationFilter = ''; // Clear specialization filter
    this.locationFilter = ''; // Clear location filter
    this.ratingFilter = -1;
    this.customLocationFilter = '';
    this.currentCoords = null;
    this.radiusFilter = 25;
    this.applyFilters(); // Apply filters to update the list
    
  }

  viewDetails(therapistId: string): void {
    this.router.navigate(['/therapists', therapistId]);
  }
}
