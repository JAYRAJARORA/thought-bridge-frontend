import { Component, OnInit } from '@angular/core';
import { Therapist } from '../shared/models/therapist.model';
import { ProfileService } from './profile.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Language } from '../shared/models/language.model';
import { Availability } from '../shared/models/availability.model';

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
  availability: Availability[] = [
    { name: 'Monday', value: 'monday', selected: false, startTime: '', endTime: '' },
    { name: 'Tuesday', value: 'tuesday', selected: false, startTime: '', endTime: '' },
    { name: 'Wednesday', value: 'wednesday', selected: false, startTime: '', endTime: '' },
    { name: 'Thursday', value: 'thursday', selected: false, startTime: '', endTime: '' },
    { name: 'Friday', value: 'friday', selected: false, startTime: '', endTime: '' },
    { name: 'Saturday', value: 'saturday', selected: false, startTime: '', endTime: '' },
    { name: 'Sunday', value: 'sunday', selected: false, startTime: '', endTime: '' },
    { name: 'Weekdays', value: 'weekday', selected: false, startTime: '', endTime: '' },
  ];
  constructor(private route: ActivatedRoute,
    private profileService: ProfileService,
    private authService: AuthService,
    private snackBar: MatSnackBar, ) {}

  ngOnInit() : void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      
      this.route.queryParams.subscribe((queryParams) => {
        this.userType = queryParams['type'];

        this.profileService.getLanguages().subscribe((languages) => {
          this.languages = languages;
          this.profileService.getProfile(id, this.userType).subscribe((profile) => {
            this.profile = profile;
            this.oldUserName = profile.username;
          });
        });
      });
    });  
  
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Adjust the duration as needed
    });
  }
  updateDaySelection(event: any): void {
    const selectedValues = event.value;  // Get the current values from the event
    this.availability.forEach(day => {
      day.selected = selectedValues.includes(day.value);  // Update selected status based on the dropdown
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

}
