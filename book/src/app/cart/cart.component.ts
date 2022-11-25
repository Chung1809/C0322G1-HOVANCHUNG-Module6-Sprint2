import {Component, OnInit} from '@angular/core';
import {AppUser} from '../model/appUser';
import {BookService} from '../service/book.service';
import {TokenStorageService} from '../service/token-storage.service';

import Swal from 'sweetalert2';
import {CartDetail} from '../model/cartDetail';
import {CartService} from '../service/cart.service';
import {forEachComment} from 'tslint';
import {render} from 'creditcardpayments/creditCardPayments';
import {ToastrService} from 'ngx-toastr';
import {DataService} from '../service/data.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user: any = {};
  username: any = {};
  cartList: CartDetail[] = [];
  name: string;
  total = 0;
  paymentHandler: any = null;
   id: number;
  quantity = 1;
  book: any;
  idCart: number;
  totalQuantity = 0;
  constructor(private bookService: BookService,
              private tokenStorageService: TokenStorageService,
              private cart: CartService,
              private toast: ToastrService,
              private data: DataService) {
  }


  ngOnInit(): void {
    this.loadHeader();
    this.bookService.getUser(this.username).subscribe(next => {
      this.user = next;
      this.totalMoney();
    });
    this.data.changeData({
      quantities: this.totalQuantity
    });
  }
  totalMoney() {
    this.total = 0;
    this.totalQuantity = 0;
    this.cart.getUserCart(this.username).subscribe(value => {
      this.cartList = value;
      console.log(value);
      for (const item of this.cartList) {
        this.total += (item.book.price * item.quantity);
        this.idCart = item.appUser.id;
        this.name = item.book.name;
        this.totalQuantity += item.quantity;
        console.log(this.totalQuantity);
      }
    });
  }
  discount(quantity: CartDetail, id: number, name: string, author: string) {
    if (quantity.quantity <= 1) {
      Swal.fire({
        title: 'Thông Báo !!',
        text: 'Bạn Muốn Xoá Sách ' + name + ' Của Tác Giả ' + author + ' Không ?!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3F51B5',
        cancelButtonColor: '#F44336',
        confirmButtonText: 'Đồng Ý',
        cancelButtonText: 'Huỷ'
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.cart.deleteCart(id).subscribe(() => {
            Swal.fire('Thông Báo !!', 'Xoá Thành Công', 'success').then();
            this.ngOnInit();
          }, e => {
            Swal.fire('Thông Báo !!', 'Đã Có Lỗi Xảy Ra. Vui Lòng Thử Lại', 'error').then();
            console.log(e);
          });
        }
      });
    } else {
      quantity.quantity = -1;
      this.totalQuantity += quantity.quantity;
      this.cart.save(quantity.quantity, this.username, quantity.book.id).subscribe();
      this.ngOnInit();
    }

  }
  increase(quantity: CartDetail) {
    quantity.quantity = +1;
    this.totalQuantity += quantity.quantity;
    this.cart.save(quantity.quantity, this.username, quantity.book.id).subscribe();
    this.ngOnInit();
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
    }
  }
  delete(id: number, name: string, author: string): void {
    Swal.fire({
      title: 'Thông Báo !!',
      text: 'Bạn Muốn Xoá Sách ' + name + ' Của Tác Giả ' + author + ' Không ?!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3F51B5',
      cancelButtonColor: '#F44336',
      confirmButtonText: 'Đồng Ý',
      cancelButtonText: 'Huỷ'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.cart.deleteCart(id).subscribe(() => {
          Swal.fire('Thông Báo !!', 'Xoá Thành Công', 'success').then();
          this.ngOnInit();
        }, e => {
          Swal.fire('Thông Báo !!', 'Đã Có Lỗi Xảy Ra. Vui Lòng Thử Lại', 'error').then();
          console.log(e);
        });
      }
    });
  }
  payment() {
    document.getElementById('paypal').innerHTML = '<div id="btnPayPal"></div>';
    render({
      id: '#paypal',
      currency: 'USD',
      value: String((this.total / 23000).toFixed(2)),
      onApprove: (details) => {
        Swal.fire('Thông Báo !!', 'Thanh Toán Thành Công', 'success').then();
        document.getElementById('close').click();
        this.cart.getPayment(this.idCart, this.name, this.username).subscribe(next => {
          this.ngOnInit();
        });
      }
    });
  }

}
