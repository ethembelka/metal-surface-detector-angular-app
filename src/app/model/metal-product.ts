import { Defect } from "./defect";

export interface MetalProduct {
    id: number;
    originalImage: string;  // Backend'den number[] olarak gelecek, serviste string'e çevrilecek
    processedImage: string; // Backend'den number[] olarak gelecek, serviste string'e çevrilecek
    name: string;
    timestamp: string;
    defective: boolean;
    defectDTOS?: Defect[];
}
