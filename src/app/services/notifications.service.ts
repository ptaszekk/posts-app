import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../model/app.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  #notification$ = new BehaviorSubject<null | Notification>(null)

  setNotification( notification: Notification | null ): void {
    this.#notification$.next(notification)
  }

  getNotification(): Observable<Notification | null> {
    return this.#notification$.asObservable();
  }
}
