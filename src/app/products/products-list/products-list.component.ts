import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { DatePipe, formatDate } from '@angular/common'




@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: any[] = [];
  isVisible = false;
  Date = new Date;
  compareDate;

  constructor(
    public datepipe: DatePipe,
    private productsService: ProductsService

  ) { }

  ngOnInit(): void {
    this.compareDate = this.datepipe.transform(this.Date, 'yyyy-MM-dd')
    this.productsService.isFormVisible.subscribe(res => {
      this.isVisible = res;
    })

    this.productsService.submitData.subscribe(res => {
      this.getData()
      this.compareDate = this.datepipe.transform(this.Date, 'yyyy-MM-dd')
    })
    this.getData()
  }

  getData() {
    this.products = this.productsService.products
  }

  onEdit(product, i) {
    this.productsService.editProduct = product;
    this.productsService.index = i;
    this.productsService.status = "edit";
    this.isVisible = true;
    this.productsService.isFormVisible.next(true);
  }


  showModal() {
    this.productsService.status = 'add';
    this.isVisible = true;
    this.productsService.isFormVisible.next(true);
  }
}
