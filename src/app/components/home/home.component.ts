import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppPaths, ToolbarTitle } from '../../constants/app.constants';
import { Post } from '../../model/app.model';
import { DataService } from '../../services/data.service';
import { DialogService } from '../../services/dialog.service';
import { LoginService } from '../../services/login.service';
import { NotificationsService } from '../../services/notifications.service';
import { ToolbarService } from '../../services/toolbar.service';
import { DialogComponent } from '../dialog/dialog.component';
import { TABLE_COLUMNS } from '../login/constants/home.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Post>;

  notification$ = this.notifications.getNotification()

  #subscription = new Subscription();

  dataSource = new MatTableDataSource<Post>(undefined);
  tableColumns: string[] = TABLE_COLUMNS

  constructor(
    private dataService: DataService,
    private dialogService: DialogService,
    private loginService: LoginService,
    private notifications: NotificationsService,
    private router: Router,
    private toolbarService: ToolbarService ) {
  }

  ngOnInit(): void {
    this.toolbarService.setTitle(ToolbarTitle.HOME)
    this.dataService.fetchUsers$().subscribe((users)=>{
      if (users) {
        this.dataService.fetchPosts();
      }
    })
    this.#subscription.add(
      this.dataService.getPosts$().subscribe(( posts ) => {
        this.dataSource = new MatTableDataSource<Post>(posts);
        this.dataSource.paginator = this.paginator;
      }))
  }

  ngOnDestroy(): void {
    this.notifications.setNotification(null);
    this.#subscription.unsubscribe()
  }

  createLink( companyName: string ) {
    return `https://${ companyName }.com`;
  }

  editPost( id: number ) {
    this.notifications.setNotification(null);
    this.router.navigate([ AppPaths.NEW_POST, id ], { queryParams: { id } }).then()
  }

  deletePost( id: number ) {
    this.dialogService.openDialog(DialogComponent, { id })
  }
}
