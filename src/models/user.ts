import { AngularFirestoreCollection } from 'angularfire2/firestore';

export class User {
  public object: {};
  constructor(
    public userId: string,
    public email: string,
    public photo: string,
    public username: string,
    public bio: string,
    public contacts: string[], //userIds of contacts
    public requestsSent: string[], //userIds whom you sent a contact request
    public requestsReceived: string[], //userIds who sent you a contact request
    public pushToken: string,
    public notifications: boolean
  ) {
    this.object = {
      userId: userId,
      email: this.email,
      photo: this.photo,
      username: this.username,
      bio: this.bio,
      requestsSent: this.requestsSent,
      requestsReceived: this.requestsReceived,
      pushToken: this.pushToken,
      notifications: this.notifications
    };
  }
}
