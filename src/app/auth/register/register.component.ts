import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { Therapist } from '../../shared/models/therapist.model';
import { CategoryService } from '../../shared/category.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formattedPhoneNumber = '';
  rawPhoneNumber = '';

  userType: string = 'user';
  user: User = { username: '', password: '', email: '' };
  therapist: Therapist = { 
    username: '', 
    password: '', 
    email: '', 
    name: '', 
    specialization: '', 
    categories: [], 
    qualifications: '',
    address: null
  };

  categories: Category[];
  selectedCategories: Category[];

  constructor(private authService: AuthService, 
    private router: Router, private snackBar: MatSnackBar, 
    private categoryService: CategoryService) { }


  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Adjust the duration as needed
    });
  }


  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    this.user.username = form.value.username;
    this.user.email = form.value.email;
    this.user.password = form.value.password;
    
    
    
    if (this.userType === 'user') {
      this.register(this.user, 'users');

    } else if (this.userType === 'therapist') {
      console.log("Logging in therapist");
      
      console.log(this.therapist?.address);
      this.therapist.phoneNumber =  parseInt(this.rawPhoneNumber),
      // this.therapist.address = form.value.address;
      this.therapist.name = form.value.name;
      this.therapist.specialization = form.value.specialization;
      this.therapist.qualifications = form.value.qualifications;

      this.therapist.username = form.value.username;
      this.therapist.email = form.value.email;
      this.therapist.password = form.value.password;
      
      this.therapist.categories = this.selectedCategories;
      this.register(this.therapist, 'therapists');
    }
    

    form.reset();
  }

  
  register(user, url) {
    this.authService.register(user, url).subscribe({
      next: (response) => {
        this.openSnackBar("User Sucessfully Created", 'Close');
        let userData = {username: response.username, authenticated: true, type: this.userType, userId: response.id};
        console.log(userData);
          // right now logged in user are handled by boolean value - TODO - handle using Proper jwt token
          this.authService.userLoggedIn.next(userData);
          this.router.navigate(['/']);
          localStorage.setItem('userData', JSON.stringify(userData));
          this.authService.autoLogout(1000000);
      },
      error: (errorResponse) => {
        if(errorResponse.status == '409') {
          this.openSnackBar(errorResponse.error, 'Close');
        } else {
          this.openSnackBar("Error in creating User", 'Close');
        }
      }
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

  
  goToLogin() {
    this.router.navigate(['/login']);
  }

  updateUserType(index: number) {
    this.userType = index === 1 ? 'therapist' : 'user';
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
