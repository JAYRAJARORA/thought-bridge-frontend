import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CategoryService } from './shared/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.categoryService.getAllCategories().subscribe({
      next: null,
      error: (error) => {
        console.log('Error fetching categories:', error);
      }
    });
  }
}
