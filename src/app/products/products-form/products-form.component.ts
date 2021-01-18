import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import * as moment from 'moment';



@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  isVisible = true;
  status = "";
  myDate = new Date();
  validateForm: FormGroup;
  constructor(
    private i18n: NzI18nService,
    private fb: FormBuilder,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      expire_date: []
    });
    this.i18n.setLocale(en_US)
    this.status = this.productsService.status;
    if (this.status === 'add') {

    } else {
      this.validateForm.patchValue(this.productsService.editProduct);
    }

    // this.validateForm = this.fb.group({
    //   name: ['', [Validators.required]],
    //   description: ['', [Validators.required]],
    //   quantity: ['', [Validators.required]],
    //   expire_date: []
    // });
    this.i18n.setLocale(en_US)
  }

  submitData(data) {
    let index = this.productsService.index;
    this.productsService.isFormVisible.next(false);
    if (this.status === "add") {
      this.productsService.products.push(
        data.value
      )
    } else {
      this.productsService.products.splice(
        index, 1, data.value
      )
    }

    this.productsService.submitData.next(true);
  }


  handleCancel(): void {
    this.productsService.isFormVisible.next(false);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();

    }
  }

  resetForm() {
    this.validateForm.reset()
    this.productsService.isFormVisible.next(true);

  }


}
