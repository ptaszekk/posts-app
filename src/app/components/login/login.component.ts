import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AppPaths, ToolbarTitle } from '../../constants/app.constants';
import { getNotification } from '../../helpers/notification.helpers';
import { NotificationText } from '../../model/app.model';
import { DataService } from '../../services/data.service';
import { LoginService } from '../../services/login.service';
import { NotificationsService } from '../../services/notifications.service';
import { ToolbarService } from '../../services/toolbar.service';

@Component({
             selector: 'app-login',
             templateUrl: './login.component.html',
             styleUrls: [ './login.component.scss' ],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class LoginComponent implements OnInit, OnDestroy {
  username = '';
  show = true;
  showNotification = false;
  #subscription = new Subscription()
  notification$ = this.notifications.getNotification()

  constructor( private dataService: DataService,
    private loginService: LoginService,
    private notifications: NotificationsService,
    private toolbarService: ToolbarService,
    private router: Router ) {
  }

  ngOnInit(): void {
    this.toolbarService.setIsLoginMode(true);
    this.toolbarService.setTitle(ToolbarTitle.LOG_IN)
    this.dataService.fetchUsers$().subscribe(((usersSaved) =>{
      if (usersSaved){
        this.dataService.fetchPosts()
      }
    }));

    this.#subscription.add(this.loginService.getIsUserLogged$().pipe(filter(Boolean)).subscribe((isUserLogged) => {
      if (isUserLogged) {
        this.router.navigate([ AppPaths.HOME ]).then()
      }
    }))
  }

  ngOnDestroy(): void {
    this.#subscription.unsubscribe()
    this.toolbarService.setIsLoginMode(false);
    this.notifications.setNotification(null)
  }

  logInUser() {
    this.showNotification = this.loginService.logInUser(this.username)
    this.notifications.setNotification(!this.showNotification ? getNotification(NotificationText.INVALID_USERNAME) : null)
  }

  removeNotification() {
    this.notification$.pipe(
        take(1),
        map(( notification ) => notification !== null))
      .subscribe(() => this.notifications.setNotification(null))
  }
}
