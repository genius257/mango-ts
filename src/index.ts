declare const brand: unique symbol;
type Opaque<T, K> = K & {readonly [brand]: T}

export type Manga = {
    id: string;
    title: string;
    description?: string;
    authors?: string[];
    cover_url?: string;
    tags?: string[];
};

export type Chapter = {
    id: string;
    title: string;
    pages: number;
    manga_title: string;
    volume?: string;
    chapter?: string;
    groups?: Array<string>;
    language?: string;
    tags?: Array<string>;
};

export type Page = {
    url: string;
    filename: string;
    headers?: Record<string, string>;
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

type MangoHttpResult<Tbody> = {
    status_code: number;
    body: Tbody;
    headers: Record<string, string>;
}

type MangoHttpPostResultBody = {
    data: string,
    headers: Record<string, string>,
    json: null | unknown,
    method: 'POST',
}

type MangoStatic = {
    get(url: string): MangoHttpResult<string>;
    get(url: string, headers: Record<string, string>): MangoHttpResult<string>;

    post(url: string, body: string): MangoHttpResult<MangoHttpPostResultBody>;
    post(
        url: string,
        body: string,
        headers: Record<string, string>
    ): MangoHttpResult<MangoHttpPostResultBody>;

    css(html: string, selector: string): string[];

    text(html: string): string;

    attribute(html: string, attr: string): string|undefined;

    storage(key: string): string | undefined;
    storage(key: string, val: unknown): unknown;

    settings(key: string): string | undefined;

    raise(msg: string): never;
}

declare const mango: MangoStatic;

export default mango;
