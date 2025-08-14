import { Genre } from "../types/genre";
import { endpointBe } from "../utils/contant";
import { my_request } from "../utils/Request";



export async function getAllGenres(): Promise<Genre[]> {
    const duongDan = endpointBe + "/genres";
    const response = await my_request(duongDan);

    const genres: Genre[] = response.map((item: any) => {
        return new Genre(
            item.id,
            item.name,
            item.slug,
            []
        );
    });

    return genres;
}

export async function get5Genres(): Promise<Genre[]> {
    const duongDan = endpointBe + "/genres/popular";
    const response = await my_request(duongDan);

    const genres: Genre[] = response.map((item: any) => {
        return new Genre(
            item.id,
            item.name,
            item.slug,
            []
        );
    });
    return genres;
}

