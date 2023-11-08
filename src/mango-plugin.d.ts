export { }

declare global {
    // Definition or type for the function.
    type Debug = (label: string) => (message: any, ...args: any[]) => void

    namespace Mango {
        type HttpResult = {
            status_code: number;
            body: string;
            headers: Record<string, string>;
        };

        interface MangoStatic {
            get(url: string): HttpResult;
            get(url: string, headers: Record<string, string>): HttpResult;

            post(url: string, body: string): HttpResult;
            post(
                url: string,
                body: string,
                headers: Record<string, string>
            ): HttpResult;

            css(html: string, selector: string): string[];

            text(html: string): string;

            attribute(html: string, attr: string): string;

            storage(key: string): string | undefined;
            storage(key: string, val: unknown): unknown;

            settings(key: string): string | null | undefined;

            raise(msg: string): unknown;
        }
    }

    // If defining an object you might do something like this
    // interface IConfig { a: number, b: number }

    // Extend the Global interface for the NodeJS namespace.
    interface Window {
        // Reference our above type, 
        // this allows global.debug to be used anywhere in our code.
        mango: Mango.MangoStatic
    }

    // This allows us to simply call debug('some_label')('some debug message')
    // from anywhere in our code.
    const mango: Mango.MangoStatic
}
