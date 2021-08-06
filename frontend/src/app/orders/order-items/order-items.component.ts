import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})
export class OrderItemsComponent implements OnInit {
  formData: OrderItem;
  itemList: Item[];
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private itemService: ItemService,
    private orderSevice: OrderService) { }

  ngOnInit() {
    this.itemService.getItemList().then(res => this.itemList = res as Item[]);
    if (this.data.orderItemIndex == null)
      this.formData = {
        OrderItemId: null,
        OrderId: this.data.OrderId,
        ItemId: 0,
        Quantity: 0,
        Total: 0
      }
    else
      this.formData = Object.assign({}, this.orderSevice.orderItems[this.data.orderItemIndex]);
  }

  updatePrice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.formData.OrderItemId = 0;
      this.formData.OrderId = 0;
    }
    else {
      this.formData.OrderItemId = this.itemList[ctrl.selectedIndex - 1].ItemPrice;
      this.formData.OrderId = this.itemList[ctrl.selectedIndex - 1].ItemId;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.OrderItemId).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null)
        this.orderSevice.orderItems.push(form.value);
      else
        this.orderSevice.orderItems[this.data.orderItemIndex] = form.value;
      this.dialogRef.close();
    }
  }

  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.ItemId == 0)
      this.isValid = false;
    else if (formData.Quantity == 0)
      this.isValid = false;
    return this.isValid;
  }

}
