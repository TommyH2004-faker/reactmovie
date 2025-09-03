import { Review } from "./review";
import { CommentMovie } from "./comment";

export class User {
  id: number;
  name: string;
  email: string;
  gender: string;
  enabled: boolean;
  reviews?: Review[];
  comments?: CommentMovie[];
  password?: string;
  avatar_url?: string;

  constructor(id: number, name: string, email: string, gender: string, enabled: boolean, reviews?: Review[], comments?: CommentMovie[], password?: string, avatar_url?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.enabled = enabled;
    this.reviews = reviews;
    this.comments = comments;
    this.password = password;
    this.avatar_url = avatar_url;
  }
}