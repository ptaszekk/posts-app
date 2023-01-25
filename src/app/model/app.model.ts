export interface InitialPost {
  userId: number,
  id: number,
  title: string,
  body: string,
}

export interface Post {
  user: UserMetadata,
  title: string,
  body: string,
  postId: number
}

export interface Notification {
  text: NotificationText;
  color: NotificationColor;
}

export enum NotificationText {
  SUCCESSFUL_SAVE = 'A new Post was saved successfully.',
  SUCCESSFUL_DELETION = 'Post was deleted successfully.',
  SUCCESSFUL_UPDATE = 'Post was updated successfully.',
  TOO_LONG_TITLE = 'Your title is too long!',
  TOO_LONG_BODY = 'Your post is too long!',
  INVALID_USERNAME = 'Not valid user name!'
}


export enum NotificationColor {
  SUCCESS = 'rgb(60, 179, 113)',
  FAILURE = 'rgb(255, 99, 71)'
}

export enum MaxLength {
  BODY = 2000,
  TITLE = 200
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string,
  }
}

export interface UserMetadata {
  name: string,
  company: string,
  userId: number
}

export interface LocalObject {
  key: string,
  value: string
}
