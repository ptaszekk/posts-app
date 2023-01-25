import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { AnimationDuration } from '../constants/app.constants';

@Injectable({
              providedIn: 'root',
            })
export class DialogService {

  constructor( public dialog: MatDialog ) {
  }

  openDialog( component: ComponentType<DialogComponent>, data: { id: number | undefined } ): void {
    this.dialog.open(component, {
      data,
      disableClose: true,
      autoFocus: true,
      enterAnimationDuration: AnimationDuration,
      exitAnimationDuration: AnimationDuration
    });
  }
}

