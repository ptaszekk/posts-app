import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AppPaths } from '../../constants/app.constants';
import { NotificationsService } from '../../services/notifications.service';
import { ToolbarService } from '../../services/toolbar.service';

@Component({
             selector: 'app-toolbar',
             templateUrl: './toolbar.component.html',
             styleUrls: [ './toolbar.component.scss' ],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class ToolbarComponent {
  readonly userMetadata$ = this.loginService.getUserMetadata$()
  readonly isUserLogged$ = this.loginService.getIsUserLogged$();
  readonly title$ = this.toolbarService.getTitle()
  readonly showGoHome$ = this.toolbarService.getIsEditMode$()
  readonly isLoginMode$ = this.toolbarService.getIsLoginMode$()

  constructor( private loginService: LoginService,
    private toolbarService: ToolbarService,
    private notifications: NotificationsService,
    private router: Router ) {
  }


  logOut(): void {
    this.loginService.logOutUser()
    this.router.navigate([ AppPaths.HOME ]).then()
    this.notifications.setNotification(null)
  }

  logIn(): void {
    this.router.navigate([ AppPaths.LOGIN ]).then()
  }

  newPost(): void {
    this.router.navigate([ AppPaths.NEW_POST]).then()
  }
}
