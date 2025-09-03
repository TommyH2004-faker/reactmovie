import { Episode } from "./episodes";
import { Favorite } from "./favorite";
import { Genre } from "./genre";
import { Review } from "./review";

export interface Movie {
  id: number;
  title: string;
  original_title?: string; // Trường mới
  slug: string;
  description: string;
  release_date?: string | null;
  duration?: number;
  poster_url: string;
  banner_url?: string;
  trailer_url?: string; // Trường mới
  status: string;
  type?: string; // Trường mới
  country?: string; // Trường mới
  director?: string; // Trường mới
  cast?: string; // Trường mới
  rating?: number; // Trường mới
  views: number;
  created_at: Date;
  updated_at: Date;
  genres: Genre[];
  episodes: Episode[];
  comments: Comment[];
  reviews: Review[];
  favorites: Favorite[];
}