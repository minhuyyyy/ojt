import { Car } from "@contracts/index";

export default function filterCars(cars: Car[], makeId: number) {
    const models = cars.filter(
        (car: Car) => car.make_id === makeId,
    );
    return models
}