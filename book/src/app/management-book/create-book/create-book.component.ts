import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {BookService} from "../../service/book.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/storage";
import {Title} from "@angular/platform-browser";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";
import {Category} from "../../model/category";
import {Discount} from "../../model/discount";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
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

  constructor(private toast: ToastrService,
              private route: Router,
              private bookService: BookService,
              private storage: AngularFireStorage,
              private title: Title) {
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

  submit() {
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const filePath = `book/${nameImg}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        this.buttonBook = false;
        fileRef.getDownloadURL().subscribe((url) => {
          this.bookForm.patchValue({image: url});
          this.bookService.save(this.bookForm.value).subscribe(
            () => {
              this.route.navigateByUrl('/list');
              this.toast.success('Thêm sách thành công', 'Thông báo', {
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
