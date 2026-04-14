export interface PageResponse<T> {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    content: T[];
}
