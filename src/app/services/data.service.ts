import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap, withLatestFrom } from 'rxjs/operators';
import { AppPaths, AppUrl, LocalStorageKeys } from '../constants/app.constants';
import { createLocalObject, getDataFromLocal, mapPostUserData, saveDataToLocal } from '../helpers/data-service.helpers';
import { getNotification } from '../helpers/notification.helpers';
import { InitialPost, NotificationText, Post, User } from '../model/app.model';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnDestroy {
  #posts$ = new BehaviorSubject<Post[]>([] as Post[]);
  #users$ = new BehaviorSubject<User[]>([] as User[]);
  #nextPostId$ = new BehaviorSubject<number>(0);

  constructor( private http: HttpClient,
    private notifications: NotificationsService,
    private router: Router ) {
  }

  ngOnDestroy(): void {
    saveDataToLocal([ createLocalObject(LocalStorageKeys.POSTS, this.#posts$.getValue()) ])
  }

  getUsers(): Observable<User[]> {
    return this.#users$.asObservable()
  }

  fetchUsers$(): Observable<boolean> {
    return this.http.get<User[]>(AppUrl.USERS).pipe(take(1), tap(( users ) => {
        this.#users$.next(users)
      }),
      map(() => true))
  }

  fetchPosts(): void {
    if (JSON.parse(<string> getDataFromLocal(LocalStorageKeys.POSTS)) !== null) {
      const posts = JSON.parse(<string> getDataFromLocal(LocalStorageKeys.POSTS))
      this.#nextPostId$.next(posts.length + 1)
      this.#posts$.next(posts);
      return;
    }

    if (this.#posts$.getValue().length === 0) {
      this.http.get<InitialPost[]>(AppUrl.POSTS)
        .pipe(take(1),
          withLatestFrom(this.#users$)).subscribe(( [ posts, users ] ) => {
        this.#nextPostId$.next(posts.length)
        this.#posts$.next(mapPostUserData(posts, users));
        saveDataToLocal([ createLocalObject(LocalStorageKeys.POSTS, this.#posts$.getValue()) ])
      });
    }
  }

  getPosts$(): Observable<Post[]> {
    return this.#posts$.asObservable()
  }

  addPost( post: Post ): void {
    this.#nextPostId$.next(this.#nextPostId$.getValue() + 1);
    this.#posts$.next([ post, ...this.#posts$.getValue() ]);
    saveDataToLocal([ createLocalObject(LocalStorageKeys.POSTS, this.#posts$.getValue()) ])
    this.notifications.setNotification(getNotification(NotificationText.SUCCESSFUL_SAVE))
  }

  updatePost( updatedPost: Post ) {
    const posts = this.#posts$.getValue().map(( post ) => post.postId === updatedPost.postId ? updatedPost : post);
    this.#posts$.next(posts);
    saveDataToLocal([ createLocalObject(LocalStorageKeys.POSTS, posts) ])
    this.router.navigate([ AppPaths.HOME ]).then();
  }

  getPostById( id: number ): Post {
    return this.#posts$.getValue().filter(( post ) => post.postId === id)[ 0 ]
  }

  removePost( postId: number ): void {
    const posts = this.#posts$.getValue().filter(( post ) => post.postId !== postId);
    this.#posts$.next(posts)
    saveDataToLocal([ createLocalObject(LocalStorageKeys.POSTS, posts) ])
    this.notifications.setNotification(getNotification(NotificationText.SUCCESSFUL_DELETION))
  }

  getNextPostId(): Observable<number> {
    return this.#nextPostId$.asObservable()
  }
}
