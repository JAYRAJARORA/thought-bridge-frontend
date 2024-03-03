import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { CategoryService } from '../shared/category.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = this.categoryService.categories;
  }

  onCategoryClick(category: Category): void {
    this.categoryService.categorySelected.emit(category.name);
  }
}
