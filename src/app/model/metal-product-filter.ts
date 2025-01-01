export interface MetalProductFilter {
    name?: string;
    defective?: boolean;
    defectType?: string;
    confidenceRate?: number;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: string;
}