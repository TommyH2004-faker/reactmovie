import { Movie } from "./movie";

export class Genre {
  id: number;
  name: string;
  slug: string;
  movies?: Movie[];

  constructor(id: number, name: string, slug: string, movies?: Movie[]) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.movies = movies;
  }
}