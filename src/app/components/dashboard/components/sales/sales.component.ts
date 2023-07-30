import { Component, OnDestroy, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { Sale } from '../../interfaces/sale';
import { errorAlert, warningAlert } from 'src/app/core/shared/helpers/alerts.helper';
import { validationErrorsToString } from 'src/app/core/shared/helpers/validation-errors.helper';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Product } from '../../interfaces/product';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, OnDestroy {
  public sales: Sale[] = []

  product!: Product;
  
  constructor (private sale: SaleService, private config: DynamicDialogConfig, private messageService: MessageService) {
    this.product = this.config.data.product;
  }

  async ngOnInit() {
    await this.getSalesByProduct();
  }
  
  async getSalesByProduct() {
    try {
      this.sales = await this.sale.findByProduct(this.product.id);
    } catch (error) {
      this.errors(error);
    }
  }

  ngOnDestroy() {
    this.sales = [];
  }

  private errors(error: any) {
    if (error.error.errors) {
      errorAlert("Login Error", validationErrorsToString(error.error.errors));
    } {
      errorAlert("Login Error", error.error.message);
    }
  }

  async createSale() {
    const amount = prompt("How many products do you want to sell?", "1");

    if (!amount) {
      return;
    }

    if (isNaN(Number(amount))) {
      return;
    }

    const amountInt = Math.round(Number(amount));

    if (amountInt <= 0) {
      return;
    }

    if (this.product.stock < amountInt) { 
      warningAlert("Warning", "You don't have enough stock to sell this amount of products.");
      return;
    }

    try {
      await this.sale.create(this.product.id, amountInt);
      await this.getSalesByProduct();
    } catch (error) {
      this.errors(error);
    }
  }
}
