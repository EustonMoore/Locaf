import { User } from "./user";
import { AngularFirestoreCollection } from "angularfire2/firestore";

export class Feed {
    public object: {};
    constructor(
      public feedId: string,
      public title: string,
      public description: string,
      public date: string,
      public writerId: string,
      public writer: User,
      public cafeId: string,
      public cafeName: string,
      public collectedNum: number,
      public photos: string[],
      public comments: AngularFirestoreCollection<{}>
     
    ) {
      this.object = {
        feedId: feedId,
        title: this.title,
        description: this.description,
        date: this.date,
        cafeId: this.cafeId,
        cafeName: this.cafeName,
        collectedNum: this.collectedNum,
        writerId: this.writerId,
        writer: this.writer,
        comments: this.comments,
        photos: this.photos
      };
    }
  }
  