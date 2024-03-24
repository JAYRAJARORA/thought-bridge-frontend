import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DiscussionService } from '../discussions/discussions.service';
import { Therapist } from '../shared/models/therapist.model';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/models/category.model';

@Component({
  selector: 'app-therapists',
  templateUrl: './therapists.component.html',
  styleUrl: './therapists.component.css'
})
export class TherapistsComponent {
  therapists: any[] = [];
  filteredTherapists: Therapist[] = [];
  selectedCategoriesFilter = [];
  specializationFilter: string = '';
  locationFilter: string = '';
  ratingFilter: number = -1;
  allCategories: Category[];

  constructor(private discussionService: DiscussionService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.fetchTherapists();
    this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
      this.allCategories = categories;
    });
  }

  fetchTherapists() {
    this.discussionService.getTherapists().subscribe(
      (therapists: any[]) => {
        this.therapists = therapists;
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching therapists:', error);
      }
    );
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
    const location = `${therapist.address}, ${therapist.city}, ${therapist.state}, ${therapist.country}`;
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
    this.applyFilters(); // Apply filters to update the list
  }
}
