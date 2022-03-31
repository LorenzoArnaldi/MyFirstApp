import { BookItemModel } from "./book-item.model";

export interface GetBooksRequest {
    user_id: string;
}

export interface GetBookRequest {
    user_id: string;
    book_id: string;
}

export interface DeleteBookRequest extends GetBookRequest {
    user_id: string;
    book_id: string;
}

export interface InsertBookRequest {
    book_id: string;
    user_id: string;
    data: BookItemModel
}

export interface UpdateBookRequest {
    user_id: string;
    book_id: string;
    data: BookItemModel
}