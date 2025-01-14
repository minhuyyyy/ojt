import { Trim } from "./trim"
import { Make } from "./make";



export interface Car {
    id: number;
    make_model_id: number;
    year: number;
    name: string;
    description: string;
    image: string;
    mileage: number;
    price: number;
    invoice: number;
    created: Date;
    modified: Date;
    make_model: MakeModel;
    trims: Trim[];
    selectedTrim: string
    make_name: string;
    make_id: number;
    body_type: string;
    engine_type: string;
}

export interface MakeModel {
    id: number;
    make_id: number;
    name: string;
    make: Make;
}

