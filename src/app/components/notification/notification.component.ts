import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Notification } from '../../model/app.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: [ './notification.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  @Input() notification!: Notification | null
}
