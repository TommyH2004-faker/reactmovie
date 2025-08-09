export class Episode {
  id: number;
  title: string;
  description: string;
  airDate: Date;

  constructor(id: number, title: string, description: string, airDate: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.airDate = airDate;
  }
}