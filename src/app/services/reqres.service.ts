import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseData } from '../interfaces/response-data';

@Injectable({
  providedIn: 'root'
})

export class ReqresService {
  static URL="https://reqres.in/api"
  static URL_USERS = ReqresService.URL + "/users";

  constructor(private http: HttpClient) {
  }

  getUser(id: number) {
    return this.http.get<ResponseData>(ReqresService.URL_USERS + "/" + id).pipe(
      map(response => response['data'])
    );
  }

  getUsers() {
    return this.http.get<ResponseData>(ReqresService.URL_USERS).pipe(
      map(response => response['data'])
    );
  }
}
