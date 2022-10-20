import { Component, OnInit } from '@angular/core';
import {Book} from '../model/book';
import {Title} from '@angular/platform-browser';
import {BookService} from '../service/book.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {AppUser} from '../model/appUser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  bookId: number;
  bookList: Book [] = [];
  bookForm: FormGroup;
  constructor(private title: Title,
              private bookService: BookService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.bookId = +paramMap.get('id');
      this.getId(this.bookId);
    });
    this.title.setTitle('Xem chi tiết');
  }

  ngOnInit(): void {
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

  getId(bookId: number) {
    this.bookService.findById(this.bookId).subscribe(next => {
      this.bookForm.patchValue(next);
    });
  }
}
