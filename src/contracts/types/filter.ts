import { Car } from "./car";
import { Color } from "./color";
import { Make } from "./make";
import { Trim } from "./trim";

export interface Filter {
    bodiesType: string[];
    enginesdriveType: string[];
    enginesType: string[];
    enginestransmission: string[];
    enginesvalveTiming: string[];
    enginesvalves: number[];
    cylinders: string[]
    filteredCars: Trim[]
    cars: Car[]
    makes: Make[],
    interiorColors: Color[],
    exteriorColors: Color[],
    trims: Trim[],
}
