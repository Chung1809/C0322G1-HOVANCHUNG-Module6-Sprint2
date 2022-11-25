import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { TokenStorageService } from '../service/token-storage.service';
import {AuthService} from '../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ShareService} from '../service/share.service';
import Swal from 'sweetalert2';
import {CookieService} from 'ngx-cookie-service';
import {BookService} from '../service/book.service';
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import {AppUser} from '../model/appUser';
import {CartService} from '../service/cart.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  roles: string[] = [];
  username: string;
  returnUrl: string;
  user: any;
  socialUser: SocialUser;
  userLogged: SocialUser;
  isLogged: boolean;


  constructor(private formBuild: FormBuilder,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private shareService: ShareService,
              private cookieService: CookieService,
              private bookService: BookService,
              private authServiceFacebook: SocialAuthService,
              private cart: CartService) {
  }

  ngOnInit(): void {
    this.authServiceFacebook.authState.subscribe(data => {
      this.userLogged = data;
      this.isLogged = (this.userLogged != null);
    });
    this.loadHeader();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
    console.log(this.returnUrl);
    this.formGroup = this.formBuild.group({
        username: [''],
        password: [''],
        remember_me: ['']
      }
    );
    if (this.tokenStorageService.getToken()) {
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.user = this.tokenStorageService.getUser().username;
    }
  }
  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.user = this.tokenStorageService.getUser().username;
      console.log(this.user);
    }
  }

  signInWithFB(): void {
    this.authServiceFacebook.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
        this.socialUser = data;
        this.isLogged = (data != null);
        const user: { password: string; email: string; username: string } = {
          email: data.email,
          password: data.id,
          username: data.name,
        };
        this.cart.saveUser(user).subscribe(next => {
          this.tokenStorageService.saveTokenSession(data.authToken);
          this.tokenStorageService.saveUserSession(data);
          this.isLogged = true;
          this.router.navigateByUrl('');
          this.formGroup = this.formBuild.group({
            username: [user.username],
            password: [user.password]
          });
          this.onSubmit();
        });
    });
  }
  signInWithGoogle(): void {
    this.authServiceFacebook.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      this.socialUser = data;
      console.log(data);
      this.isLogged = (data != null);
      const user: { password: string; email: string; username: string } = {
        email: data.email,
        password: data.id,
        username: data.name,
      };
      this.cart.saveGoogle(user).subscribe(next => {
        this.tokenStorageService.saveTokenSession(data.authToken);
        this.tokenStorageService.saveUserSession(data);
        this.isLogged = true;
        this.router.navigateByUrl('');
        this.formGroup = this.formBuild.group({
          username: [user.username],
          password: [user.password]
        });
        this.onSubmit();
      });
    });
  }

  onSubmit() {
    this.authService.login(this.formGroup.value).subscribe(data => {
      if (this.formGroup.value.remember_me === true) {
        this.tokenStorageService.saveTokenLocal(data.token);
        this.tokenStorageService.saveUserLocal(data);
      } else {
        this.tokenStorageService.saveTokenSession(data.token);
        this.tokenStorageService.saveUserSession(data);
      }

      this.authService.isLoggedIn = true;
      this.username = this.tokenStorageService.getUser().username;
      this.roles = this.tokenStorageService.getUser().roles;
      this.formGroup.reset();
      this.router.navigateByUrl(this.returnUrl);
      Swal.fire({
        title: 'Thông Báo!',
        text: 'Đăng Nhập Thành Công',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.shareService.sendClickEvent();
    }, err => {
      this.authService.isLoggedIn = false;
      this.toastr.error('Sai tên đăng nhập hoặc mật khẩu hoặc tài khoản chưa được kích hoạt', 'Đăng nhập thất bại: ', {
        timeOut: 3000,
        extendedTimeOut: 1500
      });
    });
  }

}
