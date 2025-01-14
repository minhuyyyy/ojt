import { Color } from "./color"
import { Make } from "./make"

export type Trim = {
    id: number,
    name: string,
    make_model_id: number,
    year: string,
    description: string,
    msrp: number,
    image: string,
    invoice: number,
    created: Date,
    modified: Date,
    mileage: number,
    body_type: string,
    engine_type: string,
    cylinders: string,
    colors: {
        exterior_colors?: Color[],
        interior_colors?: Color[]
    }
    make_model: MakeModel
}

interface MakeModel {
    id: number,
    make_id: number,
    name: string,
    make: Make
}