import { Review } from "./review";
import { CommentMovie } from "./comment";

export class User {
  id: number;
  name: string;
  email: string;
  reviews?: Review[];
  comments?: CommentMovie[];

  constructor(id: number, name: string, email: string, reviews?: Review[], comments?: CommentMovie[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.reviews = reviews;
    this.comments = comments;
  }
}