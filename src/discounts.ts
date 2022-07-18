import { ServiceType } from ".";
import { PRICES } from "./prices";


type DiscountYearTable = {
    [index: number]: ((services: ServiceType[]) => number)[] | undefined;
}

export const DISCOUNTS: DiscountYearTable = {
    2020: [
            (services: ServiceType[]) => photographyAndVideoDiscount(services, 1200),
            (services: ServiceType[]) => weddingSessionWithPhotographyOrVideoRecordingDiscount(services, PRICES[2020]["WeddingSession"] - 300)
    ],
    2021: [
            (services: ServiceType[]) => photographyAndVideoDiscount(services, 1300),
            (services: ServiceType[]) => weddingSessionWithPhotographyOrVideoRecordingDiscount(services, PRICES[2021]["WeddingSession"] - 300)
    ],
    2022: [
            (services: ServiceType[]) => photographyAndVideoDiscount(services, 1300),
            (services: ServiceType[]) => freeOrDiscountedWeddingSessionDiscount(services, PRICES[2022]["WeddingSession"], PRICES[2022]["WeddingSession"]- 300)
    ],
}

// package of photography + video costs less: $2200 in 2020 (1700x2 = 3400, discount size is 1200), $2300 in 2021 and $2500 in 2022,
function photographyAndVideoDiscount(services: ServiceType[], discountSize: number): number {
    return (services.includes("Photography") && services.includes("VideoRecording"))
        ? discountSize
        : 0;
} 

// Wedding session goes to 300 when recording or photography present
function weddingSessionWithPhotographyOrVideoRecordingDiscount(services: ServiceType[], discountSize: number): number {
    return (services.includes("VideoRecording") || services.includes("Photography")) && services.includes("WeddingSession")
        ? discountSize
        : 0;
}

// Wedding session goes to 0 when photography present or to 300 when video present without photography. Available only in 2022
// wedding session is free if the client chooses Photography during the wedding in 2022,
function freeOrDiscountedWeddingSessionDiscount(services: ServiceType[], weddingSessionPrice: number, discountSize: number): number {
    if( services.includes("WeddingSession")){
        return services.includes("Photography") 
            ? weddingSessionPrice
            : (services.includes("VideoRecording") ? weddingSessionPrice - discountSize : 0);
    }
    return 0;
}