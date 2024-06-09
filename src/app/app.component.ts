import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataDisplayComponent } from './components/data-display/data-display.component';
import { KeycloakService } from './services/keycloak.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DataDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'keycloak-angular';

  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit() {
    await this.initializeKeycloak();
  }

  private async initializeKeycloak() {
    const isAuthenticated = await this.keycloakService.init();
    if (isAuthenticated) {
      console.log('User authenticated');
    } else {
      console.log('User not authenticated');
    }
  }
}
