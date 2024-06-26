import { Component, OnInit } from '@angular/core';
import { Therapist } from '../shared/models/therapist.model';
import { ProfileService } from './profile.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Language } from '../shared/models/language.model';
import { Availability } from '../shared/models/availability.model';
import { Category } from '../shared/models/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  profile: Therapist;
  userType: string;
  oldUserName: string;
  languages: Language[];
  formattedPhoneNumber: string;
  rawPhoneNumber: string;
  categories: Category[];
  selectedCategories: Category[];
  selectedDays;

  availability: Availability[] = [
    { name: 'Monday', value: 'monday', selected: false, startTime: '09:00', endTime: '12:00' },
    { name: 'Tuesday', value: 'tuesday', selected: false, startTime: '09:00', endTime: '12:00' },
    { name: 'Wednesday', value: 'wednesday', selected: false, startTime: '09:00', endTime: '12:00' },
    { name: 'Thursday', value: 'thursday', selected: false, startTime: '09:00', endTime: '12:00' },
    { name: 'Friday', value: 'friday', selected: false, startTime: '09:00', endTime: '12:00' },
    { name: 'Saturday', value: 'saturday', selected: false, startTime: '09:00', endTime: '12:00' },
    { name: 'Sunday', value: 'sunday', selected: false, startTime: '09:00', endTime: '12:00' },
    { name: 'Weekdays', value: 'weekday', selected: false, startTime: '09:00', endTime: '12:00' },
  ];
  constructor(private route: ActivatedRoute,
    private profileService: ProfileService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService) {}

  ngOnInit() : void {
    
    this.route.params.subscribe((params) => {
      let id = params['id'];
      
      this.categoryService.getAllCategories().subscribe(categories => {
        this.categories = categories;
      });
      this.route.queryParams.subscribe((queryParams) => {
        this.userType = queryParams['type'];

        this.profileService.getLanguages().subscribe((languages) => {
          this.languages = languages;
          this.profileService.getProfile(id, this.userType).subscribe((profile) => {
            this.profile = profile;
            this.oldUserName = profile.username;
            this.formatPhoneNumber(profile.phoneNumber.toString());
            this.selectedCategories = profile.categories;
            if (profile.availability) {
              this.selectedDays = profile.availability.map(day => day.name); // Initialize selectedDays
              this.availability = this.availability.map(day => {
                const profileDay = profile.availability.find(pDay => pDay.name === day.name);
                // console.log(profileDay);
                
                return profileDay ? { ...day, selected: true, startTime: profileDay.startTimeAsLocalTime, endTime: profileDay.endTimeAsLocalTime } : day;
              });
              console.log(this.availability);
              
            }  
          });
        });
      });
    });  
  
  }

  onSelectionChange(event: any) {
    const selectedOptions = event.target.options;
    this.selectedCategories = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      if (selectedOptions[i].selected) {
        const categoryId = selectedOptions[i].value;
        const selectedCategory = this.categories.find(category => category.id === categoryId);
        if (selectedCategory) {
          this.selectedCategories.push(selectedCategory);
        }
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Adjust the duration as needed
    });
  }
  updateDaySelection(event: any): void {
    const selectedValues = event.value;  // Get the current values from the event
    this.availability.forEach(day => {
      day.selected = selectedValues.includes(day.name);  // Update selected status based on the dropdown
    });
  }

  handleAddressChange(updatedAddress: any) {
    this.profile.address = updatedAddress;
  }
  
  updateProfile(form: NgForm) {
    if(!form.valid) {
      return ;
    }
    // Filter selected days and map to availability
    console.log('Submitting availability:', this.availability.filter(day => day.selected));
    this.profile.availability = [];
    this.profile.availability.push(...this.availability.filter(day => day.selected));
    this.profile.phoneNumber =  parseInt(this.rawPhoneNumber);
    this.profile.categories = this.selectedCategories;
    this.profileService.updateProfile(this.profile.id, this.profile, this.userType).subscribe({
      next: (response) => {
        this.openSnackBar("Profile Sucessfully Updated", 'Close');
        if(this.oldUserName !== this.profile.username) {
          // Get the current value of the BehaviorSubject
          const currentValue = this.authService.userLoggedIn.getValue();
    
          // Update only the username field
          const updatedValue = { ...currentValue, username: this.profile.username };
    
          // Emit the updated value
          this.authService.userLoggedIn.next(updatedValue);
          localStorage.setItem("userData", JSON.stringify(updatedValue));
        }
      },
      error: (errorResponse) => {
        this.openSnackBar("Error in updating Profile", 'Close');
      }
    });
  }


  // Function to compare two language objects for equality
  compareLanguage(l1: any, l2: any): boolean {
    return l1 && l2 ? l1.id === l2.id : l1 === l2;
  }

  formatPhoneNumber(input: string): void {
    let numbers = input.replace(/\D/g, '');
    let char = {0: '(', 3: ')-', 6: '-'};
    this.formattedPhoneNumber = '';

    for (let i = 0; i < numbers.length; i++) {
      if (i > 9) break; // Ensure no more than 10 digits are allowed
      this.formattedPhoneNumber += (char[i] || '') + numbers[i];
    }

    // Keep the raw number updated without formatting
    this.rawPhoneNumber = numbers;
  }

}
