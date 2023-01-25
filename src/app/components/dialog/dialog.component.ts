import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnimationDuration, AppPaths } from '../../constants/app.constants';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private dataService: DataService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private router: Router) {}

  deletePost() {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(()=>{
      if (this.data.id) {
        setTimeout(()=>{
          this.dataService.removePost(this.data.id);
          this.router.navigate([AppPaths.HOME]).then();
        }, AnimationDuration)
      }
    })
  }

  closeModal() {
    this.dialogRef.close();
  }
}
