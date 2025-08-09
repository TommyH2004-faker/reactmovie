import { Review } from "./review";
import { Comment } from "./comment";

export class User {
  id: number;
  username: string;
  email: string;
  reviews?: Review[];
  comments?: Comment[];

  constructor(id: number, username: string, email: string, reviews?: Review[], comments?: Comment[]) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.reviews = reviews;
    this.comments = comments;
  }
}