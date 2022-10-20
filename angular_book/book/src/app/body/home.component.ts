import {Component, OnInit} from '@angular/core';

import {Title} from '@angular/platform-browser';

import {ToastrService} from 'ngx-toastr';
import {BookService} from '../service/book.service';
import {Book} from '../model/book';
import {Category} from '../model/category';
import Swal from 'sweetalert2';
import {TokenStorageService} from '../service/token-storage.service';
import {ShareService} from '../service/share.service';

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
  constructor(private title: Title,
              private bookService: BookService,
              private toast: ToastrService,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService) {
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
    this.getListSearch();
    this.loadHeader();
  }
  deleteBook(temp: any) {
    this.id = temp.id;
    this.name = temp.name;
  }
  delete(id: number) {
    this.bookService.delete(id).subscribe(next => {
      Swal.fire({
        title: 'Thông Báo!',
        text: 'Xoá Thành Công',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.getListSearch();
      this.ngOnInit();
    }, e => {
      Swal.fire({
        title: 'Đã Có Lỗi Xảy Ra !!',
        text: 'Vui Lòng Thử Lại',
        icon: 'error',
        confirmButtonText: 'Thử Lại'
      });
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
