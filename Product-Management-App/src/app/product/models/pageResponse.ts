export interface PageResponse<T> {
    totalPages: number,
    currentPage: number,
    totalElements: number,
    content: T[];
}