import { Movie } from "./movie";
import { User } from "./user";

export class Review {
  id: number;
  rating: number;
  comment?: string; // Nullable field
  user: User;
  movie: Movie;
  created_at: Date;

  constructor(id: number, rating: number, user: User, movie: Movie, created_at: Date, comment?: string) {
    this.id = id;
    this.rating = rating;
    this.user = user;
    this.movie = movie;
    this.created_at = created_at;
    this.comment = comment;
  }
}