import { LocalStorageKeys } from '../constants/app.constants';
import { InitialPost, LocalObject, Post, User, UserMetadata } from '../model/app.model';

export const mapPostUserData = ( posts: InitialPost[], users: User[] ): Post[] => {
  return posts.map(post => ( { body: post.body, title: post.title, postId: post.id, user: getPostData(post, users) } ))
}

export const getPostData = ( post: InitialPost, users: User[] ): UserMetadata => {
  const { name, company, id } = users.filter(user => user.id === post.userId)[ 0 ]
  return ( {
    name,
    company: company.name,
    userId: id,
  } )
}

export const createLocalObject = ( key: LocalStorageKeys, value: unknown ): LocalObject => {
  return ( {
    key,
    value: JSON.stringify(value),
  } )
}
