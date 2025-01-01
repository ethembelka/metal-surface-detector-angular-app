export interface PageResponse<T> {
    content: T[];
    pageable: {
        pageSize: number;
        pageNumber: number;
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
    };
    totalElements: number;
    totalPages: number;
    last: boolean;
    first: boolean;
    empty: boolean;
    number: number;
    size: number;
}