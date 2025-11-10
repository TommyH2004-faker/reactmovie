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
  avatar?: string;
  role?: string;

  constructor(id: number, name: string, email: string, gender: string, enabled: boolean, reviews?: Review[], comments?: CommentMovie[], password?: string, avatar?: string, role?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.enabled = enabled;
    this.reviews = reviews;
    this.comments = comments;
    this.password = password;
    this.avatar = avatar;
    this.role = role;
  }
}