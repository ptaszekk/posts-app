import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
            bootstrap: [ AppComponent ],
            declarations: [
              AppComponent,
              HomeComponent,
              LoginComponent,
              ToolbarComponent,
              EditPostComponent,
              NotificationComponent,
              DialogComponent,
            ],
            imports: [
              CommonModule,
              HttpClientModule,
              BrowserModule,
              AppRoutingModule,
              NgbModule,
              BrowserAnimationsModule,
              MatTableModule,
              MatPaginatorModule,
              FormsModule,
              MatFormFieldModule,
              MatButtonModule,
              MatInputModule,
              MatSortModule,
              MatIconModule,
              MatDialogModule,
              ReactiveFormsModule,
            ],
            providers: [
              { provide: MatDialogRef, useValue: {} },
              { provide: MAT_DIALOG_DATA, useValue: [] },
            ],
          })
export class AppModule {}
