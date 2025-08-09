import { Movie } from "./movie";
import { User } from "./user";

export class Favorite {
  id: number;
  user: User;
  movie: Movie;
  created_at: Date;

  constructor(id: number, user: User, movie: Movie, created_at: Date) {
    this.id = id;
    this.user = user;
    this.movie = movie;
    this.created_at = created_at;
  }
}