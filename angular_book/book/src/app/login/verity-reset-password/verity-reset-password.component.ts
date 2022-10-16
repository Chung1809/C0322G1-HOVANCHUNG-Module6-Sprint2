import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-verity-reset-password',
  templateUrl: './verity-reset-password.component.html',
  styleUrls: ['./verity-reset-password.component.css']
})
export class VerityResetPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private toastr: ToastrService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }

  formGroup: FormGroup;
  name: string;
  isSuccessful = true;
  isSendMail: boolean;
  isSubmited: false;

  validationMessages = {
    password: [
      {type: 'required', message: 'Trường này không được để trống!'},
      {type: 'minlength', message: 'Mật khẩu cần nhiều hơn 8 ký tự'},
      {type: 'maxlength', message: 'Mật khẩu chỉ được ít hơn 32 ký tự'},
    ]
  };

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      repeatNewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
    });
    this.route.queryParams.subscribe(params => {
      const code = params.code;
      if (code == null) {
        this.isSendMail = false;
      } else {
        this.isSendMail = true;
        this.isSuccessful = false;
      }
    });
  }

  onSubmit() {
    if (this.formGroup.value.newPassword !== '' && this.formGroup.value.repeatNewPassword !== '') {
      if (this.formGroup.value.newPassword === this.formGroup.value.repeatNewPassword) {
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
          this.name = paramMap.get('name');
        });
        this.authService.doResetPassword(this.formGroup.value.newPassword, this.name).subscribe(data => {
          this.toastr.success('Mật khẩu đã được thay đổi!', 'Thành công');
          this.router.navigateByUrl('/login');
        });
      } else {
        this.toastr.error('Trường nhập lại mật khẩu và mật khẩu không giống nhau!', 'Lỗi: ', {
          timeOut: 3500,
          extendedTimeOut: 1500
        });
        this.isSubmited = false;
      }
    }
  }
}
