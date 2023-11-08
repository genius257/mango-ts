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

export type searchManga = (query: string) => Array<Manga>;
export type listChapters = (manga_id: string) => Array<Chapter>;
export type selectChapter = (id: string) => Chapter;
export type nextPage = () => Page;
export type newChapters = (
    manga_id: string,
    after_timestamp: number
) => Array<Chapter>;
