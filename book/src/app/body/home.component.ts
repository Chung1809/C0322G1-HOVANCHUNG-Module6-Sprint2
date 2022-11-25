import {Component, OnInit} from '@angular/core';

import {Title} from '@angular/platform-browser';

import {ToastrService} from 'ngx-toastr';
import {BookService} from '../service/book.service';
import {Book} from '../model/book';
import {Category} from '../model/category';
import Swal from 'sweetalert2';
import {TokenStorageService} from '../service/token-storage.service';
import {ShareService} from '../service/share.service';
import {CartService} from '../service/cart.service';
import {CartDetail} from '../model/cartDetail';
import {DataService} from '../service/data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categorySearch = '';
  nameSearch = '';
  bookList: Book [] = [];
  number: number;
  indexPagination = 0;
  totalPage: string[];
  numberOfElement = 0;
  totalElements = 0;
  pageSize: number;
  displayPagination = 'inline-block';
  bookLists: Book [];
  id: number;
  name: string;
  role: string;
  username: string;
  currentUser: string;
  isLoggedIn = false;
  cart: CartDetail[] = [];
  quantity = 1;
  user: any;
  book: any;
  total: number ;
  totalQuantity = 0;
  constructor(private title: Title,
              private bookService: BookService,
              private toast: ToastrService,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private cartDetail: CartService,
              private data: DataService) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
    this.title.setTitle('Trang chủ');
  }
  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.username != null;
  }

  ngOnInit(): void {
    this.bookService.getBook().subscribe(next => {
      this.bookList = next;
    });
    this.data.changeData({
      quantities: this.totalQuantity
    });
    this.getListSearch();
    this.loadHeader();
  }
  cartList() {
    this.cartDetail.getUserCart(this.username).subscribe(value => {
      this.cart = value;
      console.log(value);
      this.total = 0;
      // this.totalQuantity = 0;
      for (const item of this.cart) {
        this.total += item.book.price * item.quantity;
        this.quantity = item.quantity;
        this.book = item.book.id;
        // this.totalQuantity += item.quantity;
        console.log(this.totalQuantity);
      }
  });
  }

  addToCart(book: Book) {
    for (const item of this.cart) {
      if (book.id === item.book.id) {
        this.cartDetail.save(this.quantity + 1, this.username, this.book).subscribe(next => {
          this.data.changeData({
            quantities: this.totalQuantity += this.quantity + 1
          });
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
    this.cartDetail.save(this.quantity, this.username, book.id).subscribe(next => {
      this.data.changeData({
        quantities: this.totalQuantity += this.quantity
      });
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
        this.bookService.delete(id).subscribe(() => {
          Swal.fire('Thông Báo !!', 'Xoá Thành Công', 'success').then();
          this.ngOnInit();
        }, e => {
          Swal.fire('Thông Báo !!', 'Đã Có Lỗi Xảy Ra. Vui Lòng Thử Lại', 'error').then();
          console.log(e);
        });
      }
    });
  }
  getListSearch() {
    this.bookService.getListAndSearch(this.indexPagination, this.categorySearch,
      this.nameSearch, this.pageSize).subscribe((data?: any) => {
      if (data === null) {
        this.totalPage = new Array(0);
        this.bookLists = [];
        this.displayPagination = 'none';
      } else {
        this.number = data?.number;
        console.log(this.number);
        this.pageSize = data?.size;
        this.numberOfElement = data?.numberOfElements;
        this.bookLists = data?.content;
        console.log(this.bookList + ' ok');
        this.totalElements = data?.totalElements;
      }
    }, error => {
      this.bookList = null;
    });
  }
}
