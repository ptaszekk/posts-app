import { NotificationColor, NotificationText } from '../model/app.model';

export const getNotification = (text: NotificationText) =>{
  return ({
    text,
    color: getNotificationColor(text)
  })
}

export const getNotificationColor = (text: NotificationText): NotificationColor => {
  switch (text) {
    case NotificationText.INVALID_USERNAME:
    case NotificationText.TOO_LONG_BODY:
    case NotificationText.TOO_LONG_TITLE:
      return NotificationColor.FAILURE;
    default:
      return NotificationColor.SUCCESS
  }
}
