import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalStorageKeys } from './constants/app.constants';
import { getDataFromLocal } from './helpers/data-service.helpers';
import { isUserSavedInLocalStorage } from './helpers/login-service.helpers';
import { DataService } from './services/data.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor( private loginService: LoginService,
    private dataService: DataService ) {
  }

  ngOnInit(): void {
    if (isUserSavedInLocalStorage()) {
      this.dataService.fetchUsers$().subscribe(( (usersAreSavedInLocalStorage) => {
        if (usersAreSavedInLocalStorage) {
          this.loginService.logInUser(JSON.parse(<string> getDataFromLocal(LocalStorageKeys.LOGGED_USER)))
        }
      } ));
    }
  }
}
