import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { errorAlert, warningAlert } from 'src/app/core/shared/helpers/alerts.helper';
import { validationErrorsToString } from 'src/app/core/shared/helpers/validation-errors.helper';
import { CategoryService } from '../services/category.service';
import { SaleService } from '../services/sale.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { SalesComponent } from '../components/sales/sales.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent {
  public products!: Product[];
  public categories!: any[];

  ref?: DynamicDialogRef;

  constructor(private product: ProductService, private category: CategoryService, private sale: SaleService, public dialogService: DialogService, public messageService: MessageService) { }

  async ngOnInit() {
    await this.getCategories();
    await this.getProducts();
  }

  async getProducts() {
    try {
      this.products = await this.product.all();
    } catch (error) {
      this.errors(error);
    }
  }

  async getCategories() {
    try {
      this.categories = await this.category.all();
    } catch (error) {
      this.errors(error);
    }
  }

  getCategoryName(category_id: number) {
    return this.categories.find((category: any) => category.id === category_id).name ?? "Unknown";
  }

  private errors(error: any) {
    if (error.error.errors) {
      errorAlert("Login Error", validationErrorsToString(error.error.errors));
    } else {
      errorAlert("Login Error", error.error.message);
    }
  }

  public async deleteProduct(product: Product) {
    if (!confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await this.product.delete(product.id);
      await this.getProducts();
    } catch (error) {
      this.errors(error);
    }
  }

  public async editProduct(product: Product) {
    const categoriesText = this.categories.map((category: any) => `${category.id} - ${category.name}`).join("\n");

    const name = prompt("Enter new product name", product.name);
    const price = prompt("Enter new product price", product.price.toString());
    const stock = prompt("Enter new product stock", product.stock.toString());
    const category_id = prompt(`Enter new product category_id\n${categoriesText}`, product.category_id.toString());

    if (!name || !price || !category_id)
      return;

    try {
      await this.product.update(product.id, name, Number(price), Number(category_id), Number(stock));
      await this.getProducts();
    } catch (error) {
      this.errors(error);
    }
  }

  public async createProduct() {
    const name = prompt("Enter new product name");
    const price = prompt("Enter new product price");
    const category_id = prompt("Enter new product category_id");

    if (!name || !price || !category_id)
      return;

    try {
      await this.product.create(name, Number(price), Number(category_id));
      await this.getProducts();
    } catch (error) {
      this.errors(error);
    }
  }

  openSalesDialog(product: Product) {
    this.ref = this.dialogService.open(SalesComponent, {
      header: 'Sales',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        product: product
      }
    });

    this.ref.onClose.subscribe((data) => {
      this.getProducts();
    });

  }
}
