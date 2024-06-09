import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataDisplayComponent } from './components/data-display/data-display.component';
import { KeycloakInitService } from './services/keycloak-init.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DataDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'keycloak-angular';

  constructor(private keycloakInitService: KeycloakInitService) {}

  async ngOnInit() {
    await this.keycloakInitService.initializeKeycloak();
  }
}
