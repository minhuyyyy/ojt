import { composeWithDevTools } from '@redux-devtools/extension';
import { createWrapperInitializer } from '@redux-eggs/next';
import { combineReducers } from '@reduxjs/toolkit';
import { createStore } from './createStore';

const HYDRATE = '@@store/HYDRATE';

const reducerCombiner = (reducersMap) => {
    const combinedReducer = combineReducers(reducersMap);

    return (state = {}, action) => {
        return combinedReducer(
            action.type === HYDRATE && action.payload
                ? { ...state, ...action.payload }
                : state,
            action,
        );
    };
};

const createAppStore = () => {
    return createStore({
        combiner: reducerCombiner,
        enhancersComposer: composeWithDevTools({ maxAge: 200 }),
    });
};

export const wrapperInitializer = createWrapperInitializer(createAppStore, {
    hydrationActionType: HYDRATE,
});

export const getDuckEgg = (duck) => ({
    id: duck.store,
    keep: true,
    reducersMap: {
        [duck.store]: duck.reducer,
    },
});
