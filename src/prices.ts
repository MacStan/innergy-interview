type ServiceCosts = {
    [index: string]: number;
  }

type PriceTable = {
    [index: number]: ServiceCosts | undefined;
}

export const PRICES : PriceTable = {
    2020 : {
        "Photography" : 1700,
        "VideoRecording" : 1700,
        "BlurayPackage" : 300,
        "TwoDayEvent" : 400,
        "WeddingSession" : 600,
    },
    2021 : {
        "Photography" : 1800,
        "VideoRecording" : 1800,
        "BlurayPackage" : 300,
        "TwoDayEvent" : 400,
        "WeddingSession" : 600,
    },
    2022 : {
        "Photography" : 1900,
        "VideoRecording" : 1900,
        "BlurayPackage" : 300,
        "TwoDayEvent" : 400,
        "WeddingSession" : 600,
    },
}