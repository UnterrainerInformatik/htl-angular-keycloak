import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})

export class KeycloakService {
  private keycloakAuth: Keycloak;
  private keycloakConfig = {
    url: "https://keycloak.lan.elite-zettl.at/",
    realm: 'cms',
    clientId: 'CMS',
    //url: 'https://auth.htl-leonding.ac.at/',
    //realm: 'unterrainer',
    //clientId: 'htl-test'  // Secure clients are not supported since this is a frontend-library
                          // and there's no way to keep the client secret safe here.
  };

  constructor() {
    this.keycloakAuth = new Keycloak(this.keycloakConfig);
  }

  async init(): Promise<boolean> {
    try {
      console.log('Initializing Keycloak');
      const authenticated = await this.keycloakAuth.init({
        onLoad: 'login-required', // Redirect to login if not authenticated
        flow: 'standard', // implicit flow: access token only; no auth code
                          // hybrid flow: access token and id token; no auth code
                          // standard flow: access token, id token and refresh token with auth code
        checkLoginIframe: false, // Disable login iframe check
      });
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

  async logout() {
    return this.keycloakAuth.logout();
  }

  isAuthenticated() {
    return this.keycloakAuth.authenticated;
  }
}