export interface StatusCodeMap {
    code: number;
    message: string;
}
export interface ErrorMap {
    [key: number]: StatusCodeMap;
}
