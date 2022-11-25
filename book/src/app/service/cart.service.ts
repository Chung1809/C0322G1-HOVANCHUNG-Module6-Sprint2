import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CartDetail} from '../model/cartDetail';
import {environment} from '../../environments/environment';
import {Book} from '../model/book';
import {AppUser} from '../model/appUser';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }
  findAllHistoryCart(user: number ): Observable<CartDetail[]> {
    return this.httpClient.get<CartDetail[]>(`${API_URL}/book/cart/history/` + user);
  }
  save(quantity: number, user: string, book: number): Observable<CartDetail> {
    return this.httpClient.get<CartDetail>(`${API_URL}/book/cart/save/${quantity}/${book}/${user}`);
  }
  quantity(quantity: number, user: string, book: number): Observable<CartDetail> {
    return this.httpClient.get<CartDetail>(`${API_URL}/book/cart/quantity/${quantity}/${book}/${user}`);
  }
  saveCart(cart): Observable<CartDetail> {
    return this.httpClient.post<CartDetail>(`${API_URL}/book/cart/save`, cart);
  }
  deleteCart(id: number): Observable<CartDetail> {
    return this.httpClient.delete<CartDetail>(`${API_URL}/book/deleteCart/${id}`);
  }
  getUserCart(username: string): Observable<any> {
    return this.httpClient.get<any>(`${API_URL}/book/list/cart/` + username);
  }
  getCartHistory(username: string): Observable<any> {
    return this.httpClient.get<any>(`${API_URL}/book/list/cart/history/` + username);
  }
  getCart( book: number, user: number): Observable<any> {
    return this.httpClient.get<any>(`${API_URL}/book/cart/${book}/${user}`);
  }
  getPayment( user: number, name: string, sendMail: string): Observable<any> {
    return this.httpClient.put<any>(`${API_URL}/book/payment/${user}/${sendMail}`, name);
  }
  saveUser(user): Observable<AppUser> {
    return this.httpClient.post<AppUser>(`${API_URL}/book/facebook`, user);
  }
  saveGoogle(user): Observable<AppUser> {
    return this.httpClient.post<AppUser>(`${API_URL}/book/google`, user);
  }

}
