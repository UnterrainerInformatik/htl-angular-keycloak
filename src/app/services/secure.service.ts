import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseData } from '../interfaces/response-data';
import { KeycloakService } from './keycloak.service';
import { KeycloakInitService } from './keycloak-init.service';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SecureService {
  static URL="https://reqres.in/api"
  static URL_USERS = SecureService.URL + "/users";

  constructor(private http: HttpClient, private keycloakService: KeycloakService, private keycloakInitService: KeycloakInitService) {
  }

  private async waitForAuth(func: (headers: HttpHeaders) => Observable<any>) {
    try {
      // Ensure Keycloak is initialized before proceeding.
      const r = await firstValueFrom(this.keycloakInitService.getKeycloakInitialized());
      console.log("Signal: Keycloak is initialized.", r);
      const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + await this.keycloakService.getToken() });
      return await firstValueFrom(func(headers));
    } catch (error) {
      console.error("Error in getUsers:", error);
      throw error;
    }
  }

  async getUser(id: number) {
    return this.waitForAuth((headers) => {
      return this.http.get<ResponseData>(SecureService.URL_USERS + "/" + id, { headers }).pipe(
        map(response => response['data'])
      )
    });
  }

  async getUsers() {
    return this.waitForAuth((headers) => {
      return this.http.get<ResponseData>(SecureService.URL_USERS, { headers }).pipe(
        map(response => response['data'])
      )
    });
  }
}
