import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppPaths, ToolbarTitle } from '../../constants/app.constants';
import { MaxLength, Notification, NotificationColor, NotificationText, Post } from '../../model/app.model';
import { DataService } from '../../services/data.service';
import { DialogService } from '../../services/dialog.service';
import { LoginService } from '../../services/login.service';
import { NotificationsService } from '../../services/notifications.service';
import { ToolbarService } from '../../services/toolbar.service';
import { DialogComponent } from '../dialog/dialog.component';
import { EditPostFormFields } from './constants/edit-post.constants';

@Component({
  selector: 'app-new-post',
  templateUrl: './edit-post.component.html',
  styleUrls: [ './edit-post.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPostComponent implements OnInit, OnDestroy {
  title = '';
  post = '';
  id!: number | undefined
  #subscription = new Subscription()
  titleNotification$ = new BehaviorSubject<Notification | null>(null)
  descriptionNotification$ = new BehaviorSubject<Notification | null>(null)
  currentPost!: Post | null;
  readonly maxLength = MaxLength;
  readonly formField = EditPostFormFields

  constructor( private dataService: DataService,
    private loginService: LoginService,
    private toolbarService: ToolbarService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private notifications: NotificationsService,
    private router: Router ) {
  }

  ngOnInit(): void {
    this.toolbarService.setIsEditMode(true);
    this.#subscription.add(this.route.queryParams.subscribe(( params ) => {
      this.toolbarService.setTitle(params?.id ? ToolbarTitle.EDIT_POST : ToolbarTitle.NEW_POST)

      if (params?.id) {
        this.id = +params.id;
        this.currentPost = this.dataService.getPostById(+params.id)
        this.title = this.currentPost.title;
        this.post = this.currentPost.body;
      }
    }))
  }

  ngOnDestroy(): void {
    this.toolbarService.setIsEditMode(false);
    this.#subscription.unsubscribe()
  }

  addPost() {
    if (this.title !== '') {
      combineLatest([ this.loginService.getUserMetadata$(), this.dataService.getNextPostId() ]).pipe(take(1)).subscribe(( [ {
        name,
        company,
        userId,
      }, postId ] ) => {
        this.dataService.addPost({
          body: this.post,
          title: this.title,
          user: {
            name,
            company,
            userId,
          },
          postId: this.id ?? postId + 1,
        })
      })
      this.router.navigate([ AppPaths.HOME ]).then();
    }
  }

  editPost(): void {
    if (this.title !== '' && this.currentPost) {
      this.dataService.updatePost({
        ...this.currentPost,
        body: this.post,
        title: this.title,
        user: this.loginService.getUserMetadata(),
      })
      this.notifications.setNotification({ text: NotificationText.SUCCESSFUL_UPDATE, color: NotificationColor.SUCCESS })
    }
  }

  showLengthNotification( event: Event ) {
    switch (( event.target as HTMLElement ).attributes.getNamedItem('id')?.value as EditPostFormFields) {
      case this.formField.TITLE:
        this.setNotification(this.titleNotification$, event, MaxLength.TITLE, NotificationText.TOO_LONG_TITLE);
        break;
      case this.formField.BODY:

        // change notification values to enum
        this.setNotification(this.descriptionNotification$, event, MaxLength.BODY, NotificationText.TOO_LONG_BODY);
        break
      default: // should never happen
        break
    }
  }

  setNotification( notification: BehaviorSubject<Notification | null>, event: Event, maxLength: MaxLength, text: NotificationText ): void {
    notification.next(( event.target as HTMLInputElement ).value.length < maxLength ? null : {
      text, color: NotificationColor.FAILURE,
    })
  }

  deletePost(): void {
    this.dialogService.openDialog(DialogComponent, { id: this.id })
  }

  cancel() {
    this.router.navigate([ AppPaths.HOME ]).then();
  }


}
