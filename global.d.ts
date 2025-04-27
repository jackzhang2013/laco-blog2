export {};

declare global {
    interface ObjectConstructor {
        entries<T>(obj: { [key: string]: T }): [string, T][];
    }
    interface Window {}
}
