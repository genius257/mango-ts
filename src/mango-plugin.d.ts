type MangoHttpResult = {
    status_code: number;
    body: string;
    headers: Record<string, string>;
}

type MangoStatic = {
    get(url: string): MangoHttpResult;
    get(url: string, headers: Record<string, string>): MangoHttpResult;

    post(url: string, body: string): MangoHttpResult;
    post(
        url: string,
        body: string,
        headers: Record<string, string>
    ): MangoHttpResult;

    css(html: string, selector: string): string[];

    text(html: string): string;

    attribute(html: string, attr: string): string;

    storage(key: string): string | undefined;
    storage(key: string, val: unknown): unknown;

    settings(key: string): string | null | undefined;

    raise(msg: string): unknown;
}

declare const mango: MangoStatic;

export = mango;
