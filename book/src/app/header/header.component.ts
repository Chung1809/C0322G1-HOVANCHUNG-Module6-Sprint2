import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../service/token-storage.service';
import {ShareService} from '../service/share.service';
import {BookService} from '../service/book.service';
import {Category} from '../model/category';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

import {CartDetail} from '../model/cartDetail';
import {CartComponent} from '../cart/cart.component';
import {CartService} from '../service/cart.service';
import {DataService} from '../service/data.service';
import {SocialAuthService, SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;
  idPatient: number;
  currentUser: string;
  role: string;
  isLoggedIn = false;
  categoryList: Category[];
  id: number;
  totalQuantity: any = 0;
  userLogged: SocialUser;
  isLogged: boolean;
  formSearch = new FormGroup({
    search: new FormControl()
  });


  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private category: BookService,
              private route: Router,
              private data: DataService,
              private authServiceFacebook: SocialAuthService) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  ngOnInit(): void {
    this.loadHeader();
    this.category.getCategory().subscribe(next => {
      this.categoryList = next;
    });
    this.data.getData.subscribe((result: any) => {
      this.totalQuantity = result.quantities;
      console.log(this.totalQuantity);
    });
  }
  getId(id: number) {
   this.route.navigateByUrl('category/' + id );
  }
  search() {
    if (this.formSearch.get('search').value == null ) {
       this.route.navigateByUrl('/category/0');
    } else {
      this.route.navigateByUrl('/category/0' + this.formSearch.get('search').value);
    }
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.username != null;
  }
  logOut() {
    this.tokenStorageService.signOut();
    this.authServiceFacebook.signOut();
  }
}
