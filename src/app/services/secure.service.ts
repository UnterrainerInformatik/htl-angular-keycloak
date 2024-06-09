import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResponseData } from '../interfaces/response-data';
import { KeycloakService } from './keycloak.service';
import { KeycloakInitService } from './keycloak-init.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SecureService {
  static URL="https://reqres.in/api"
  static URL_USERS = SecureService.URL + "/users";

  constructor(private http: HttpClient, private keycloakService: KeycloakService, private keycloakInitService: KeycloakInitService) {
  }

  async getUser(id: number) {
    try {
      // Ensure Keycloak is initialized before proceeding.
      const r = await firstValueFrom(this.keycloakInitService.getKeycloakInitialized());
      console.log("Signal: Keycloak is initialized.", r);
      const token = await this.keycloakService.getToken();
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const responseData = await firstValueFrom(
        this.http.get<ResponseData>(SecureService.URL_USERS + "/" + id, { headers }).pipe(
          map(response => response['data'])
        )
      );
      return responseData;
    } catch (error) {
      console.error("Error in getUsers:", error);
      throw error; // Re-throw the error or handle it as needed
    }
  }

  async getUsers() {
    try {
      // Ensure Keycloak is initialized before proceeding.
      const r = await firstValueFrom(this.keycloakInitService.getKeycloakInitialized());
      console.log("Signal: Keycloak is initialized.", r);
      const token = await this.keycloakService.getToken();
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const responseData = await firstValueFrom(
        this.http.get<ResponseData>(SecureService.URL_USERS, { headers }).pipe(
          map(response => response['data'])
        )
      );
      return responseData;
    } catch (error) {
      console.error("Error in getUsers:", error);
      throw error; // Re-throw the error or handle it as needed
    }
  }
}
