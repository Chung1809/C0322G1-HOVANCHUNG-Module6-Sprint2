import { Component, OnInit } from '@angular/core';
import {BookService} from "../../service/book.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Book} from "../../model/book";
import {Category} from "../../model/category";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    category: new FormGroup({
      name: new FormControl('')
    })
  });

  categorySearch = '';
  nameSearch = '';
  bookList: Book [] = [];
  categoryList: Category [] = [];
  number: number;
  indexPagination = 0;
  totalPage: string[];
  numberOfElement = 0;
  totalElements = 0;
  pageSize: number;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  displayPagination = 'inline-block';

  constructor(private title: Title,
              private bookService: BookService,
              private toast: ToastrService) {
    this.title.setTitle('Quản lý sách');
  }

  ngOnInit(): void {
    this.searchBook();
    this.getListSearch();
    this.getCategoryList();
  }

  getCategoryList() {
    this.bookService.getCategory().subscribe(data => {
      this.categoryList = data;
    });
  }

  getListSearch() {
    this.bookService.getListAndSearch(this.indexPagination, this.categorySearch,
      this.nameSearch, this.pageSize).subscribe((data?: any) => {
      if (data === null) {
        this.totalPage = new Array(0);
        this.bookList = [];
        this.displayPagination = 'none';
      } else {
        this.number = data?.number;
        console.log(this.number);
        this.pageSize = data?.size;
        this.numberOfElement = data?.numberOfElements;
        this.bookList = data?.content;
        console.log(this.bookList + ' ok');
        this.totalElements = data?.totalElements;
      }
      this.checkPreviousAndNext();
    }, error => {
      this.bookList = null;
    });
  }

  searchBook() {
    this.categorySearch = this.searchForm.value.category.name;
    this.nameSearch = this.searchForm.value.name;
    this.getListSearch();
  }


  previousPage(event: any) {
    event.preventDefault();
    this.indexPagination--;
    this.ngOnInit();
  }

  nextPage(event: any) {
    event.preventDefault();
    this.indexPagination++;
    this.ngOnInit();
  }

  checkPreviousAndNext() {
    if (this.indexPagination === 0) {
      this.previousPageStyle = 'none';
    } else if (this.indexPagination !== 0) {
      this.previousPageStyle = 'inline-block';
    }
    if (this.indexPagination < (this.totalPage.length - 1)) {
      this.nextPageStyle = 'inline-block';
    } else if (this.indexPagination === (this.totalPage.length - 1) || this.indexPagination > (this.totalPage.length - 1)) {
      this.nextPageStyle = 'none';
    }
  }

}
