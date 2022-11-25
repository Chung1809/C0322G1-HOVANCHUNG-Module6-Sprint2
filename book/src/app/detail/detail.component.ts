import { Component, OnInit } from '@angular/core';
import {Book} from '../model/book';
import {Title} from '@angular/platform-browser';
import {BookService} from '../service/book.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {AppUser} from '../model/appUser';
import Swal from 'sweetalert2';
import {TokenStorageService} from '../service/token-storage.service';
import {ShareService} from '../service/share.service';
import {CartService} from '../service/cart.service';
import {CartDetail} from '../model/cartDetail';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  bookId: number;
  bookList: Book [] = [];
  id: number;
  bookForm: FormGroup;
  name: string;
  role: string;
  username: any = {};
  cart: CartDetail[];
  user: any = {};
  total = 0;
  cartList: CartDetail[];
  quantity = 1;
  book: any;
  isLoggedIn: boolean;

  constructor(private title: Title,
              private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private cartDetail: CartService,
              private cartService: CartService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.bookId = +paramMap.get('id');
      this.getId(this.bookId);
    });
    this.title.setTitle('Xem chi tiết');
  }

  ngOnInit(): void {
    this.loadHeader();
    this.bookService.getUser(this.username).subscribe(next => {
      this.user = next;
      this.totalMoney();
    });
    this.bookForm = new FormGroup({
      id: new FormControl(''),
      code: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      image: new FormControl(''),
      publisher: new FormControl(''),
      totalPage: new FormControl(''),
      author: new FormControl(''),
      releaseDate: new FormControl(''),
      category: new FormControl(''),
      discount: new FormControl(''),
    });

  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
      console.log(this.username);
    }
    this.isLoggedIn = this.username != null;
  }

  getId(bookId: number) {
    this.bookService.findById(this.bookId).subscribe(next => {
      this.bookForm.patchValue(next);
      console.log(next);
    });
  }
  totalMoney() {
    this.total = 0;
    this.cartService.getUserCart(this.username).subscribe(value => {
      this.cartList = value;
      for (const item of this.cartList) {
        this.total += (item.book.price * item.quantity);
        console.log(this.total);
      }
    });
  }
  increase() {
    this.quantity = +1;
    this.cartService.save(this.quantity + 1, this.username, this.book).subscribe();
  }
  addToCart() {
      for (const item of this.cartList) {
        if ( this.bookId === item.book.id ) {
          // this.quantity = +1;
          this.cartDetail.save(this.quantity + 1, this.username, this.book).subscribe(next => {
            console.log(next);
            Swal.fire({
              title: 'Thông Báo!',
              text: 'Thêm Mới Giỏ Hàng Thành Công',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          }, e => {
            Swal.fire({
              title: 'Đã Có Lỗi Xảy Ra Với Giỏ Hàng !!',
              text: 'Vui Lòng Thử Lại',
              icon: 'error',
              confirmButtonText: 'Thử Lại'
            });
          });
        }
      }
      this.quantity = +1;
      this.cartDetail.save(this.quantity, this.username, this.bookId).subscribe(next => {
        console.log(next);
        Swal.fire({
          title: 'Thông Báo!',
          text: 'Thêm Mới Giỏ Hàng Thành Công',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }, e => {
        Swal.fire({
          title: 'Đã Có Lỗi Xảy Ra Với Giỏ Hàng !!',
          text: 'Vui Lòng Thử Lại',
          icon: 'error',
          confirmButtonText: 'Thử Lại'
        });
      });
    }

}
