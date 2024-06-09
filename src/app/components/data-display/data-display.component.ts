import { Component } from '@angular/core';
import { ReqresService } from '../../services/reqres.service';
import { SecureService } from 'src/app/services/secure.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css'
})

export class DataDisplayComponent {
  public user: any;
  public users: any;
  public secureUser: any;

  constructor(private reqresService: ReqresService, private secureService: SecureService) {}

  async ngOnInit() {
    this.reqresService.getUser(1).subscribe(data => {
      this.user = data
    });
    this.reqresService.getUsers().subscribe(data => {
      this.users = data
    });
    this.secureService.getUser(1).subscribe(data => {
      this.user = data
    });
  }
}
