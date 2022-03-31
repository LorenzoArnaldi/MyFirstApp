import { FilmItemModel } from "./film-item.model";

export interface GetFilmsRequest {
    user_id: string;
}

export interface GetFilmRequest {
    user_id: string;
    film_id: string;
}

export interface DeleteFilmRequest extends GetFilmRequest {
    user_id: string;
    film_id: string;
}

export interface InsertFilmRequest {
    user_id: string;
    data: FilmItemModel
}

export interface UpdateFilmRequest {
    user_id: string;
    film_id: string;
    data: FilmItemModel
}