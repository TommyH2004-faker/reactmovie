import {Movie} from "./movie";

export class Episode {
  id: number;
  episodes_number: number;
  title: string;
  video_url: string;
  subtitle_url?: string;
  created_at: Date;
  movie_id: Movie;

    constructor(id: number, episodes_number: number, title: string, video_url: string, created_at: Date, movie_id: Movie, subtitle_url?: string) {
        this.id = id;
        this.episodes_number = episodes_number;
        this.title = title;
        this.video_url = video_url;
        this.created_at = created_at;
        this.movie_id = movie_id;
        this.subtitle_url = subtitle_url;
    }
}