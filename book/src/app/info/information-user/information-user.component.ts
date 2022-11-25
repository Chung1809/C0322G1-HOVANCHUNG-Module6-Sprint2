import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {AppUser} from '../../model/appUser';
import {TokenStorageService} from '../../service/token-storage.service';
import {SocialAuthService} from 'angularx-social-login';

@Component({
  selector: 'app-information-user',
  templateUrl: './information-user.component.html',
  styleUrls: ['./information-user.component.css']
})
export class InformationUserComponent implements OnInit {
  user: any;
  username: any;
  date: any;

  constructor(private bookService: BookService,
              private tokenStorageService: TokenStorageService,
              private authServiceFacebook: SocialAuthService) {
  }


  ngOnInit(): void {
    this.authServiceFacebook.authState.subscribe(data => {
      this.user = data;
      this.username = data.name;
    });
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
