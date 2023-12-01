declare const brand: unique symbol;
type Opaque<T, K> = K & {readonly [brand]: T}

/**
 * A manga series in your plugin.
 */
export type Manga = {
    /** Manga id. */
    id: string;
    /** Manga title. */
    title: string;
    /** Manga description. */
    description?: string;
    /** List of authors of the manga. */
    authors?: string[];
    /** URL for the manga cover image. */
    cover_url?: string;
    /** A list of tags for the manga. */
    tags?: string[];
};

/**
 * A downloadable chapter in your plugin.
 */
export type Chapter = {
    /**
     * Chapter id.
     *
     * The chapter ID must be universally unique within your plugin. You can't have two chapters (even in different manga) with the same ID.
     */
    id: string;
    /** Chapter title. */
    title: string;
    /** Number of pages in the chapter. */
    pages: number;
    /** The title of the manga, the chapter belongs to */
    manga_title: string;
    /** The volume number. */
    volume?: string;
    /** The chapter number. */
    chapter?: string;
    /** A list of group names. */
    groups?: Array<string>;
    /** The written language of the chapter */
    language?: string;
    /** A list of chapter tags. */
    tags?: Array<string>;
};

/**
 * A downloadable page in a chapter.
 */
export type Page = {
    /** Url for the page image. */
    url: string;
    /** The unique filename of the page. */
    filename: string;
    /** The headers to use, when downloading the page. */
    headers?: Record<string, string>;
};

export type searchManga = (query: string) => json_encoded<Array<Manga>>;
export type listChapters = (manga_id: string) => json_encoded<Array<Chapter>>;
export type selectChapter = (id: string) => json_encoded<Chapter>;
export type nextPage = () => json_encoded<Page | Record<string, never>>;
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
    /**
     * Sends a GET request to a URL and returns a response object.
     */
    get(url: string): MangoHttpResult<string>;
    get(url: string, headers: Record<string, string>): MangoHttpResult<string>;

    /**
     * Sends a POST request to a URL and returns a response object.
     */
    post(url: string, body: string): MangoHttpResult<MangoHttpPostResultBody>;
    post(
        url: string,
        body: string,
        headers: Record<string, string>
    ): MangoHttpResult<MangoHttpPostResultBody>;

    /**
     * Applies the CSS selector and returns an array of matched HTML elements.
     *
     * An empty array is returned when no match is found.
     */
    css(html: string, selector: string): string[];

    /**
     * Returns the inner text of the html.
     *
     * An empty string is returned when the HTML contains no text.
     */
    text(html: string): string;

    /**
     * Returns the attribute value of the outmost node.
     *
     * If no matched attribute is found, undefined is returned.
     */
    attribute(html: string, attr: string): string|undefined;

    /**
     * Retrives a value under a string identifier equal to the provided key.
     *
     * If no string identifier equal to the provided key is found, undefined is returned.
     *
     * The data is stored in `storage.json` in your plugin folder.
     */
    storage(key: string): string | undefined;
    /**
     * Stores a value under a string identifier equal to the provided key.
     *
     * The data is stored in `storage.json` in your plugin folder.
     */
    storage(key: string, val: unknown): unknown;

    /**
     * Retrieves the value for `key` as defined in the `settings` property in `info.json`.
     *
     * It returns `undefined` when the key doesn't exist, or when the value is `null`.
     */
    settings(key: string): string | undefined;

    /**
     * Raises an exception with an error message in the upstream Crystal method.
     */
    raise(msg: string): never;
}

declare const mango: MangoStatic;

export default mango;
