import { DISCOUNTS as DISCOUNTS } from "./discounts";
import { PRICES } from './prices';
import { SERVICES_REQUIRED_ON_SELECT, SERVICES_TO_DESELECT } from './services-helpers';

export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

function deselectDependentServices(services: ServiceType[], deselectedService: ServiceType): ServiceType[]
{
    if(SERVICES_TO_DESELECT[deselectedService] !== undefined) {
        SERVICES_TO_DESELECT[deselectedService].forEach(condition => {
            services = condition(services);
        });
    }

    return services;
}

function requiredServicesPresent(services: ServiceType[], selectedService: ServiceType): boolean {
    if(SERVICES_REQUIRED_ON_SELECT[selectedService] !== undefined){
        return SERVICES_REQUIRED_ON_SELECT[selectedService](services);
    }

    return true;
}

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
) => {    
    if(action.type === "Deselect"  && previouslySelectedServices.includes(action.service)) {
        previouslySelectedServices = previouslySelectedServices.filter(element => element !== action.service);
        previouslySelectedServices = deselectDependentServices(previouslySelectedServices, action.service);
    }
    else if (action.type === "Select" 
        && !previouslySelectedServices.includes(action.service) 
        && requiredServicesPresent(previouslySelectedServices,action.service )) {

        previouslySelectedServices = [
            ...previouslySelectedServices,
            action.service
        ];
    }
    
    return previouslySelectedServices;
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => {
    let priceTable = PRICES[selectedYear];
    let price = 0;
    selectedServices.forEach(service => {
        if(priceTable[service] !== undefined){
            price += priceTable[service];
        }
    });

    let discount = 0;
    if(DISCOUNTS[selectedYear] !== undefined){
        DISCOUNTS[selectedYear].forEach(discountCalculator => {
            let newDiscount = discountCalculator(selectedServices);
            discount += newDiscount;
        });
    }


    return ({ basePrice: price, finalPrice: price - discount });
}