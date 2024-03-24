import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'] // Note: Use styleUrls instead of styleUrl
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  selectedCategoryIds: string[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onCategoryClick(categoryId: string): void {
    const index = this.selectedCategoryIds.indexOf(categoryId); // Check if category ID already exists
    
    if (index === -1) {
      this.selectedCategoryIds.push(categoryId); // Push the clicked category ID to the array if not already present
    } else {
      this.selectedCategoryIds.splice(index, 1); // Remove the category ID if already present (to toggle selection)
    }
    
    this.categoryService.categorySelected.emit(this.selectedCategoryIds); // Emit the updated array of category IDs
  }
}
