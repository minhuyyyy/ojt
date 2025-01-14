import { Car, Make } from "@contracts/index";

export default function getMakeCarsNumber(makes: Make[], cars: Car[]) {
    const carCountMap = new Map<number, number>();

    cars.forEach((car: Car) => {
        carCountMap.set(car.make_id, (carCountMap.get(car.make_id) || 0) + 1)
    })

    return makes.map((make: Make) => ({
        ...make,
        numberOfCars: carCountMap.get(make.id) || 0
    }))
}