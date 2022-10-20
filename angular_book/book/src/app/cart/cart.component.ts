import { Component, OnInit } from '@angular/core';
import {AppUser} from '../model/appUser';
import {BookService} from '../service/book.service';
import {TokenStorageService} from '../service/token-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user: any;
  username: any;

  constructor(private bookService: BookService,
              private tokenStorageService: TokenStorageService) {
  }


  ngOnInit(): void {
    this.loadHeader();
    this.bookService.getUser(this.username).subscribe(next => {
      this.user = next;
      console.log(next);
    });
  }
  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
      console.log(this.user);
    }
  }

}
