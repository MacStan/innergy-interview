import { ServiceType } from "."

type ServicesRequiredOnSelect = {
    [index: string]:((services: ServiceType[]) => boolean) | undefined;
}

export const SERVICES_REQUIRED_ON_SELECT: ServicesRequiredOnSelect = {
    "TwoDayEvent": (services: ServiceType[]) => services.includes("Photography") || services.includes("VideoRecording"),
    "BlurayPackage": (services: ServiceType[]) => services.includes("VideoRecording")
}

type ServicesToDeselect = {
    [index: string]: ((services: ServiceType[]) => ServiceType[])[];
}

export const SERVICES_TO_DESELECT: ServicesToDeselect = {
    "VideoRecording": [
            // Extra bluray possible only when VideoRecording chosen
            (services: ServiceType[]) => {
                return services.includes("BlurayPackage") 
                    ? services.filter(element => element !== "BlurayPackage")
                    : services;
            },
            // TwoDayEvent can't be selected without photography or videorecording
            (services: ServiceType[]) => {
                return services.includes("TwoDayEvent") && !(services.includes("VideoRecording") || services.includes("Photography"))
                    ? services.filter(element => element !== "TwoDayEvent")
                    : services;
            }
    ],
    "Photography": [
        // TwoDayEvent can't be selected without photography or videorecording
        (services: ServiceType[]) => services.includes("TwoDayEvent") && !(services.includes("VideoRecording") || services.includes("Photography"))
            ? services.filter(element => element !== "TwoDayEvent")
            : services
    ]
}
