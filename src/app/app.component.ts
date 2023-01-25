import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalStorageKeys } from './constants/app.constants';
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
    if (this.loginService.isUserInLocal()) {
      this.dataService.fetchUsers$().subscribe(( usersSaved => {
        if (usersSaved) {
          this.loginService.logInUser(JSON.parse(<string> this.dataService.getDataFromLocal(LocalStorageKeys.LOGGED_USER)))
        }
      } ));
    }
  }
}
