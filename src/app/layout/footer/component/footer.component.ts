import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { UserSessionService } from 'src/app/core/user-session/service/user-session.service';

@Component({
  selector: 'mma-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userSessionService: UserSessionService
  ) { }

  public logout() {
    this.authService.logout();
    this.userSessionService.setSessionData(null);
  }

  ngOnInit(): void {
  }

}
