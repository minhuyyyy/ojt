import { buildStore } from '@redux-eggs/core';
import { ThunkMiddleware, Tuple, UnknownAction, combineReducers, compose, configureStore } from '@reduxjs/toolkit';


export const createStore = ({
    combiner = combineReducers,
    defaultMiddlewareOptions,
    devTools,
    extensions,
}) => {
    return buildStore(
        (
            reducer,
            middlewareEnhancer,
            enhancersFromExtensions,
            middlewaresFromExtensions,
        ) => {
            return configureStore({
                reducer,
                devTools,
                enhancers(getDefaultEnhancers) {
                    return getDefaultEnhancers().concat(
                        ...enhancersFromExtensions,
                    );
                },
                middleware(getDefaultMiddleware) {
                    return [
                        ...getDefaultMiddleware(defaultMiddlewareOptions),
                        ...middlewaresFromExtensions,
                        middlewareEnhancer,
                    ] as Tuple<[ThunkMiddleware<any, UnknownAction>]>;
                },
            });
        },
        combiner,
        compose,
        extensions,
    );
};
