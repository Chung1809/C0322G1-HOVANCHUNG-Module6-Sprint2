import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../model/category';
import {Discount} from '../../model/discount';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BookService} from '../../service/book.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Title} from '@angular/platform-browser';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  bookForm: FormGroup;
  selectedImage: File = null;
  categoryList: Category[];
  discountList: Discount[];
  checkImgSize = false;
  regexImageUrl = false;
  editImageState = false;
  checkImg: boolean;
  url: any;
  msg = '';
  buttonBook = true;
  bookId: number;

  constructor(private toast: ToastrService,
              private route: Router,
              private bookService: BookService,
              private storage: AngularFireStorage,
              private activatedRoute: ActivatedRoute,
              private title: Title) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.bookId = +paramMap.get('id');
      this.getId(this.bookId);
    });
    this.title.setTitle(' Thêm sách ');
  }

  ngOnInit(): void {
    this.bookService.getCategory().subscribe(next => {
      this.categoryList = next;
    });
    this.bookService.getDiscount().subscribe( next => {
      this.discountList = next;
    });
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
  compare(value, option): boolean {
    return value.id === option.id;
  }

  submit() {
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const filePath = `book/${nameImg}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        this.buttonBook = false;
        fileRef.getDownloadURL().subscribe((url) => {
          this.bookForm.patchValue({image: url});
          this.bookService.update(this.bookId, this.bookForm.value).subscribe(
            () => {
              this.route.navigateByUrl('');
              this.toast.success('Sửa sách thành công', 'Thông báo', {
                messageClass: 'center',
                positionClass: 'toast-top-center'
              });
            },
            error => {
              this.toast.error('Thêm sách thất bại', 'Thông báo', {
                messageClass: 'center',
                positionClass: 'toast-top-center'
              });
            }
          );
        });
      })
    ).subscribe();
  }

  onFileSelected(event) {
    this.regexImageUrl = false;
    if (event.target.files[0].size > 9000000) {
      return;
    }
    this.selectedImage = event.target.files[0];
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG|png|PNG|jpeg|JPEG)$')) {
      this.regexImageUrl = true;
      return;
    }
    this.bookForm.patchValue({imageUrl: this.selectedImage.name});
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return;
    }
    if (event.target.files[0].size > 9000000) {
      return;
    }
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG|png|PNG|jpeg|JPEG)$')) {
      return;
    }
    this.checkImgSize = false;
    this.checkImg = false;
    this.editImageState = true;

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Chỉ có file ảnh được hỗ trợ';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

}
