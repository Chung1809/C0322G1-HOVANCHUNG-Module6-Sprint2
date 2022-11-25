import {Component, OnInit} from '@angular/core';
import {CartDetail} from '../../model/cartDetail';
import {CartService} from '../../service/cart.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {BookService} from '../../service/book.service';

@Component({
  selector: 'app-history-cart',
  templateUrl: './history-cart.component.html',
  styleUrls: ['./history-cart.component.css']
})
export class HistoryCartComponent implements OnInit {
  cartList: CartDetail[] = [];
  role: string;
  username: any = {};
  id: number;
  getCart: CartDetail[];
  user: any = {};

  constructor(private cart: CartService,
              private tokenStorageService: TokenStorageService,
              private bookService: BookService) {
  }
  ngOnInit(): void {
    this.loadHeader();
    this.bookService.getUser(this.username).subscribe(value => {
      this.user = value;
    });
    this.cart.getCartHistory(this.username).subscribe(result => {
      this.cartList = result;
      console.log(result);
      for (const item of this.cartList) {
        this.id = item.appUser.id;
        console.log(this.id);
      }
      this.cart.findAllHistoryCart(this.id).subscribe(next => {
        this.getCart = next;
      });
    });
    }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
    }
  }

}
