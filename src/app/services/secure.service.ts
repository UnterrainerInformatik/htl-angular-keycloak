import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseData } from '../interfaces/response-data';
import { KeycloakService } from './keycloak.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SecureService {
  static URL="https://reqres.in/api"
  static URL_USERS = SecureService.URL + "/users";

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {
  }

  getUser(id: number) {
      if (this.keycloakService.isAuthenticated()) {
        return this.http.get<ResponseData>(SecureService.URL_USERS + "/" + id).pipe(
          map(response => response['data'])
        );
      } else {
        console.log('User not authenticated');
        return of(undefined)
      };
  }
  
  getUsers() {
      if (this.keycloakService.isAuthenticated()) {
        return this.http.get<ResponseData>(SecureService.URL_USERS).pipe(
          map(response => response['data'])
        );
      } else {
        return of(undefined)
      };
  }
}
