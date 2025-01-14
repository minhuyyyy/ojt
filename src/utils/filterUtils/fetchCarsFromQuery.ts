import { Car, Trim } from "@contracts/index";
import filterState from "./filterState";
import localInstance from "@fetchers/localInstance";
import seedingData from "@utils/seedingData";
import { Color } from "@contracts/types/color";

const fetchCarsFromQuery = async (model: string, make: string, year: string) => {

    // Fetch all necessary data
    const modelsRes = await localInstance.get(`/cars`, { params: { year: year } });

    const makeModelsRes = await localInstance.get(`/cars`, { params: { make: make, model: model, year: year } });

    const makesRes = await localInstance.get('/makes', { params: { make: make, model: model, year: year } });

    const bodiesRes = await localInstance.get(`/bodies?verbose=yes`, { params: { make: make, model: model, year: year } });

    const trimsRes = await localInstance.get('/trims', { params: { make: make, model: model, year: year } });

    const enginesRes = await localInstance.get(`/engines`, { params: { model: model, make: make, year: year } });

    const extColorsRes = await localInstance.get(`/exterior-colors`, { params: { model: model, make: make, year: year } });

    const intColorsRes = await localInstance.get(`/interior-colors`, { params: { model: model, make: make, year: year } });

    // Store cars in a map with their ID as the key
    const trimsMap: { [id: string]: Trim } = {};



    trimsRes.data.forEach((trim: Trim) => {
        trimsMap[trim.make_model_id] = {
            ...trim,
            image: seedingData.generateVehicleImage(200, 200),
            mileage: seedingData.generateRandomAmount(2020),
        };
    });

    bodiesRes.data.forEach((body) => {
        const trim = body.make_model_trim;
        const modelId = trim.make_model.id;

        if (trimsMap[modelId]) {
            trimsMap[modelId] = {
                ...trimsMap[modelId],
                body_type: body.type || trimsMap[modelId].body_type,
            };
        } else {
            console.warn(`Trim with model ID ${modelId} not found in trimsMap`);
        }
    });

    extColorsRes.data.forEach((color) => {
        const trim = color.make_model_trim;
        const modelId = trim.make_model_id;

        // Check if trimsMap[modelId] exists
        if (trimsMap[modelId]) {
            // Ensure the colors object and exterior_colors array exist
            const existingColors = trimsMap[modelId].colors?.exterior_colors || [];

            // Update the trimsMap with the new color added
            trimsMap[modelId] = {
                ...trimsMap[modelId],
                colors: ({
                    ...trimsMap[modelId].colors,
                    exterior_colors: [...existingColors, { name: color.name, rgb: color.rgb }],
                }),
            };
        } else {
            console.warn(`Trim with model ID ${modelId} not found in trimsMap`);
        }
    });

    intColorsRes.data.forEach((color) => {
        const trim = color.make_model_trim;
        const modelId = trim.make_model_id;

        // Check if trimsMap[modelId] exists
        if (trimsMap[modelId]) {
            // Ensure the colors object and interior_colors array exist
            const existingColors = trimsMap[modelId].colors?.exterior_colors || [];

            // Update the trimsMap with the new color added
            trimsMap[modelId] = {
                ...trimsMap[modelId],
                colors: ({
                    ...trimsMap[modelId].colors,
                    interior_colors: [...existingColors, { name: color.name, rgb: color.rgb }],
                }),
            };
        } else {
            console.warn(`Trim with model ID ${modelId} not found in trimsMap`);
        }
    });



    enginesRes.data.forEach((engine) => {
        const trim = engine.make_model_trim;
        const modelId = trim.make_model_id;

        if (trimsMap[modelId]) {
            trimsMap[modelId] = {
                ...trimsMap[modelId],
                engine_type: engine.engine_type,
                cylinders: engine.cylinders,
            };
        } else {
            console.warn(`Trim with model ID ${modelId} not found in trimsMap`);
        }
    })

    const cars = new Set(Object.values(trimsMap));
    const filteredBodies = filterState(bodiesRes.data, ['type']);
    const colors = filterState(extColorsRes.data, ['name', 'rgb']);

    const intColors = filterState(intColorsRes.data, ['name', 'rgb']);
    const filteredEngines = filterState(enginesRes.data, ['engine_type']);
    const cylinders = filterState(Array.from(cars), ['cylinders']);


    return {
        bodies: filteredBodies,
        engines: filteredEngines,
        colors,
        intColors,
        cylinders: cylinders,
        makes: makesRes.data,
        models: modelsRes.data,
        makeModels: makeModelsRes.data,
        trims: trimsRes.data,
        cars: Array.from(cars),
    };
};

export default fetchCarsFromQuery;
