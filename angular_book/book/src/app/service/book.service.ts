import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model/book";
import {Category} from "../model/category";
import {environment} from "../../environments/environment";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }
  save(book): Observable<Book> {
    return this.http.post<Book>(`${API_URL}/book/create`, book);
  }

  findById(id: number): Observable<Book> {
    return this.http.get(`${API_URL}/book/${id}`);
  }

  update(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${API_URL}/book/edit/${id}`, book);
  }
  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}/book/list/category`);
  }
  getListAndSearch(page: number, name: string ,category: string, size: number): Observable<any> {
    return this.http.get<any>(API_URL + '/book/list?page=' + page + '&name=' + name +'&category=' + category+ '&size=' + size);
  }

  delete(id: number):Observable<Book> {
    return this.http.delete<Book>(`${API_URL}/delete/${id}`)
  }
  checkDate(date: string): Observable<string> {
    return this.http.get<string>(API_URL + '/book/date/' + date);
  }
}
