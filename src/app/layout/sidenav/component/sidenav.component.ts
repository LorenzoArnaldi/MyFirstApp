import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { UserSessionService } from 'src/app/core/user-session/service/user-session.service';

@Component({
  selector: 'mma-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, 
    private router: Router,
    private authService: AuthService,
    private userSessionService: UserSessionService) 
    {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  navigateBy(url:string) {
    this.router.navigateByUrl(url)
  }

  public logout() {
    this.authService.logout();
    this.userSessionService.setSessionData(null);
  }

}
