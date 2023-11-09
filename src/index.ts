declare const brand: unique symbol;
type Opaque<T, K> = K & {readonly [brand]: T}

export type Manga = {
    id: string;
    title: string;
    description: string;
    authors: string[];
    cover_url: string;
    tags: string[];
};

export type Chapter = {
    id: string;
    title: string;
    pages: number;
    manga_title: string;
    volume: string;
    chapter: string;
    groups: Array<string>;
    language: string;
    tags: Array<string>;
};

export type Page = {
    url: string;
    filename: string;
    headers: Record<string, string>;
};

export type searchManga = (query: string) => json_encoded<Array<Manga>>;
export type listChapters = (manga_id: string) => json_encoded<Array<Chapter>>;
export type selectChapter = (id: string) => json_encoded<Chapter>;
export type nextPage = () => json_encoded<Page>;
export type newChapters = (
    manga_id: string,
    after_timestamp: number
) => json_encoded<Array<Chapter>>;

type json_encoded<T> = Opaque<T, "JSON">;
export function json_encode<T>(value: T): json_encoded<T> {
    return JSON.stringify(value) as json_encoded<T>;
}
