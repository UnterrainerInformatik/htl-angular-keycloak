import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})

export class KeycloakService {
  private keycloakAuth: Keycloak;

  constructor() {
    this.keycloakAuth = new Keycloak({
      url: 'https://auth.htl-leonding.ac.at/',
      realm: 'unterrainer',
      clientId: 'secureLectures'  // Secure clients are not supported since this is a frontend-library
                                  // and there's no way to keep the client secret safe here.
    });
  }

  async init(): Promise<boolean> {
    try {
      const authenticated = await this.keycloakAuth.init({});
      console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
      return authenticated;
    } catch (error) {
      console.error('Failed to initialize Keycloak:', error);
      return false;
    }
  }

  getToken(): Promise<string> {
    return this.keycloakAuth.token ? Promise.resolve(this.keycloakAuth.token) : Promise.reject('Not logged in');
  }

  login() {
    return this.keycloakAuth.login();
  }

  logout() {
    return this.keycloakAuth.logout();
  }

  isAuthenticated() {
    return this.keycloakAuth.authenticated;
  }
}