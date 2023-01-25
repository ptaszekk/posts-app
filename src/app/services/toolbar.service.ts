import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToolbarTitle } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  #title$ = new Subject<ToolbarTitle>();
  #isEditMode$ = new Subject<boolean>();
  #isLoginMode$ = new Subject<boolean>();

  setIsLoginMode( val: boolean ): void {
    this.#isLoginMode$.next(val);
  }

  getIsLoginMode$(): Observable<boolean> {
    return this.#isLoginMode$.asObservable()
  }

  setIsEditMode( val: boolean ): void {
    this.#isEditMode$.next(val);
  }

  getIsEditMode$(): Observable<boolean> {
    return this.#isEditMode$.asObservable()
  }

  setTitle( title: ToolbarTitle ): void {
    this.#title$.next(title);
  }

  getTitle(): Observable<ToolbarTitle> {
    return this.#title$.asObservable()
  }
}
