import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LocalStorageKeys } from '../constants/app.constants';
import { createLocalObject, saveDataToLocal } from '../helpers/data-service.helpers';
import { isUserSavedInLocalStorage } from '../helpers/login-service.helpers';
import { User, UserMetadata } from '../model/app.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  #isUserLogged$ = new BehaviorSubject<boolean>(false);
  #userMetadata$ = new BehaviorSubject<UserMetadata>({} as UserMetadata)

  constructor( private dataService: DataService ) {
  }

  setIsUserLogged( val: boolean ) {
    this.#isUserLogged$.next(val);
  }

  getIsUserLogged$(): Observable<boolean> {
    return this.#isUserLogged$.asObservable();
  }

  getIsUserLogged(): boolean {
    return this.#isUserLogged$.getValue();
  }

  logInUser( userName: string ): boolean {
    this.dataService.getUsers().pipe(take(1)).subscribe(( users ) => {
      if (isUserSavedInLocalStorage()) {
        this.setIsUserLogged(true);
        this.setUserMetadata(userName, users)
      } else {
        this.setIsUserLogged(users.map(( user ) => user.name === userName).some(Boolean));
        if (this.getIsUserLogged()) {
          this.setUserMetadata(userName, users)
          saveDataToLocal([ createLocalObject(LocalStorageKeys.LOGGED_USER, userName) ]);
        }
      }
    })
    return this.getIsUserLogged();
  }

  setUserMetadata( userName: string, users: User[] ): void {
    const metadata = users.filter(( user ) => user.name === userName).map(( loggedUser ) => ( {
      name: loggedUser.name,
      company: loggedUser.company.name,
      userId: loggedUser.id,
    } ))[ 0 ] // only one name matches
    this.#userMetadata$.next(metadata)
  }

  getUserMetadata$(): Observable<UserMetadata> {
    return this.#userMetadata$.asObservable()
  }

  getUserMetadata(): UserMetadata {
    return this.#userMetadata$.getValue()
  }

  logOutUser(): void {
    this.#isUserLogged$.next(false);
    localStorage.removeItem(LocalStorageKeys.LOGGED_USER)
  }
}
