/** Binding seeding data to json:
 *
 * json.price = seedingData.generateRandomAmount();
 *
 * or
 *
 * const newResponse = {
 *  ...,
 *  price: generateRandomAmount(),
 *  ...,
 * }
 *
 ** If want to remove any unused properties in order to shorten or flatten the json:
 *
 * delete json.price
 *
 * or
 *
 * const newResponse = {
 *  ...,
 *  price: undefined,
 *  ...,
 * }
 */

import { faker } from '@faker-js/faker';

// TODO: Add unit test for this one
var exteriorColors = [
    '000000',
    '0000ff',
    'a52a2a',
    '800020',
    '808080',
    '008000',
    'f9f9f9',
    'ff0000',
    'c0c0c0',
    'ffffff',
];

var interiorColors = [
    'f5f5dc',
    '000000',
    '0000ff',
    'a52a2a',
    '333333',
    '808080',
    'f9f9f9',
    'ff0000',
    'd2b48c',
    'ffffff',
];
const seedingData = {
    generateRandomAmount(year = 0) {
        switch (year) {
            case 2020:
                return generateDecimals(70_000, 90);

            case 2019:
                return generateDecimals(50_000, 50);

            case 2018:
                return generateDecimals(40_000, 20);

            case 2017:
                return generateDecimals(30_000, 50);

            case 2016:
                return generateDecimals(20_000, 10);

            case 2015:
                return generateDecimals(15_000, 70);

            default:
                return generateDecimals(15_000, 50);
        }
    },

    // pass width + height as your wish
    generateVehicleImage(width = 200, height = 300) {
        return `https://picsum.photos/${width}/${height}`;
    },

    colors: [{ exterior: exteriorColors }, { interior: interiorColors }],
    carDataGenerator(cars, makes) {
        return generateCarData(cars, makes);
    },
};

function generateDecimals(power, tens) {
    return (Math.random() * power + tens).toFixed(2);
}

function generateCarData(cars, makes) {
    return cars.map((car) => ({
        ...car,
        mileage: seedingData.generateRandomAmount(2020),
        // make_name: getMakeFromId(makes, car.make_id),
        price: faker.number.int({
            min: 10000,
            max: 300000,
        }),
        image: seedingData.generateVehicleImage(),
        trims: [], // Initialize trims as an empty array
    }));
}

export default seedingData;
