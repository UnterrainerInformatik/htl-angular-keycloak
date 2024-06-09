import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { KeycloakService } from './keycloak.service';

@Injectable({
  providedIn: 'root'
})

export class KeycloakInitService {
  private keycloakInitialized = new Subject<boolean>();

  constructor(private keycloakService: KeycloakService) {}

  async initializeKeycloak(): Promise<void> {
    const isAuthenticated = await this.init();
    console.log('setting keycloakInitialized to', isAuthenticated);
    this.keycloakInitialized.next(isAuthenticated);
  }

  private async init() {
    const isAuthenticated = await this.keycloakService.init();
    console.log(`Keycloak ${ this.keycloakService.isAuthenticated() ? "" : "not " }initialized`);
    if (isAuthenticated) {
      console.log('User authenticated');
      console.log('Token:', await this.keycloakService.getToken());
    } else {
      console.log('User not authenticated');
    }
    return isAuthenticated;
  }

  getKeycloakInitialized(): Observable<boolean> {
    return this.keycloakInitialized.asObservable();
  }
}