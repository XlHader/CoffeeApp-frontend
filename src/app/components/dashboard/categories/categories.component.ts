import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../interfaces/category';
import { errorAlert } from 'src/app/core/shared/helpers/alerts.helper';
import { validationErrorsToString } from 'src/app/core/shared/helpers/validation-errors.helper';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent implements OnInit {
  public categories!: Category[];

  constructor (private category: CategoryService) {}

  async ngOnInit() {
    await this.getCategories();
  }

  async getCategories() {
    try {
      this.categories = await this.category.all();
    } catch (error) {
      this.errors(error);
    }
  }


  private errors(error: any) {
    if (error.error.errors) {
      errorAlert("Login Error", validationErrorsToString(error.error.errors));
    } {
      errorAlert("Login Error", error.error.message);
    }
  }

  public async deleteCategory(category: Category) {
    if (!confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await this.category.delete(category.id);
      await this.getCategories();
    } catch (error) {
      this.errors(error);
    }
  }


  public async editCategory(category: Category) {
    const name = prompt("Enter new category name", category.name);

    if (!name)
      return;

    try {
      await this.category.update(category.id, name);
      await this.getCategories();
    } catch (error) {
      this.errors(error);
    }
  }

  public async createCategory() {
    const name = prompt("Enter new category name");

    if (!name)
      return;

    try {
      await this.category.create(name);
      await this.getCategories();
    } catch (error) {
      this.errors(error);
    }
  }
  
}
