import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: categories => {
        this.categories = categories;
      },
      error: (error) => {
        console.log('Error fetching categories:', error);
      }
    });

  }

  onCategoryClick(category: Category): void {
    this.categoryService.categorySelected.emit(category.name);
  }
}
