import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../service/token-storage.service';
import {ShareService} from '../service/share.service';
import {BookService} from '../service/book.service';
import {Category} from '../model/category';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

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


  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private category: BookService,
              private route: Router) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  ngOnInit(): void {
    this.loadHeader();
    this.category.getCategory().subscribe(next => {
      this.categoryList = next;
    });
  }
  getId(id: number) {
   this.route.navigateByUrl('category/' + id );
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
  }
}
