import { Movie } from "./movie";
import { User } from "./user";

export class Comment {
  id: number;
  content: string;
  user: User;
  movie: Movie;
  created_at: Date;

  constructor(id: number, content: string, user: User, movie: Movie, created_at: Date) {
    this.id = id;
    this.content = content;
    this.user = user;
    this.movie = movie;
    this.created_at = created_at;
  }
}