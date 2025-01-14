//lodash
import _get from 'lodash/get';

//redux
import { createSelector } from 'reselect';
import { createAction } from '@redux/createAction';
import Duck from 'extensible-duck';

//split to smaller duck for each state

const initialState = {
    loading: true,
    error: null,
    showMobile: false,
    filters: {},
    showMobileFilterModal: false,
    query: {},
};

const duckCreator = new Duck({
    namespace: '',
    store: 'hydrate',
    consts: {},
    initialState,

    types: [
        'CLEAR',
        'LOADING_DATA',
        'LOADED_FILTERS',
        'SET_SHOW_MOBILE',
        'SET_SHOW_MOBILE_FILTER_MODAL',
        'SET_QUERY',
        'SET_TRIMS',
        'UPDATE_STATE',
        'SET_FILTERED_CARS',
    ],

    reducer: (state, action, { types }) => {
        switch (action.type) {
            case types.LOADING_DATA: {
                const { payload = {} } = action;
                return {
                    ...state,
                    loading: payload,
                };
            }
            case types.LOADED_FILTERS: {
                const { payload = {} } = action;
                return {
                    ...state,
                    filters: payload,
                    loading: false,
                    // error: null,
                };
            }

            case types.SET_SHOW_MOBILE: {
                const { payload = {} } = action;
                return {
                    ...state,
                    showMobile: window.innerWidth < 768 || payload,
                    loading: false,
                };
            }

            case types.SET_SHOW_MOBILE_FILTER_MODAL: {
                const { payload = {} } = action;
                return {
                    ...state,
                    showMobileFilterModal: payload,
                    loading: false,
                };
            }

            case types.SET_FILTERED_CARS: {
                const { payload = {} } = action;
                return {
                    ...state,
                    filters: { ...state.filters, filteredCars: payload },
                    loading: false,
                };
            }

            case types.CLEAR: {
                return { ...initialState };
            }

            case types.SET_QUERY: {
                const { payload = {} } = action;
                return {
                    ...state,
                    query: payload,
                    loading: false,
                };
            }

            case types.UPDATE_STATE: {
                const { payload } = action;
                return {
                    ...state,
                    filters: { ...state.filters, [payload.key]: payload.data },
                    loading: false,
                };
            }

            default:
                return state;
        }
    },

    creators: ({ types }) => ({
        clear: () => createAction(types.CLEAR),
        setLoading: (payload) => createAction(types.LOADING_DATA, payload),
        setFilters: (payload) => createAction(types.LOADED_FILTERS, payload),
        setShowMobile: (payload) =>
            createAction(types.SET_SHOW_MOBILE, payload),
        setShowMobileFilterModal: (payload) =>
            createAction(types.SET_SHOW_MOBILE_FILTER_MODAL, payload),
        setQuery: (payload) => createAction(types.SET_QUERY, payload),
        setTrims: (payload) => createAction(types.SET_TRIMS, payload),
        updateState: (payload) => createAction(types.UPDATE_STATE, payload),
    }),

    selectors: (duck) => ({
        getDuckState: (state) => _get(state, duck.store, initialState),

        getAllStates: new Duck.Selector(
            (selectors) => (state) => selectors.getDuckState(state),
        ),

        getIsMobile: new Duck.Selector(
            (selectors) => (state) =>
                _get(selectors.getAllStates(state), 'showMobile', false),
        ),

        getLoading: new Duck.Selector((selectors) =>
            createSelector(
                (state) => _get(selectors.getAllStates(state), 'loading', true),
                (loading) => ({
                    loading,
                }),
            ),
        ),
        getAllCars: new Duck.Selector((selectors) =>
            createSelector(
                (state) => _get(selectors.getAllStates(state), 'cars', {}),
                (cars) => ({
                    cars,
                }),
            ),
        ),

        getAllMakes: new Duck.Selector((selectors) =>
            createSelector(
                (state) => _get(selectors.getAllStates(state), 'makes', {}),
                (makes) => ({
                    makes,
                }),
            ),
        ),

        getAllFilters: new Duck.Selector((selectors) =>
            createSelector(
                (state) => _get(selectors.getAllStates(state), 'filters', {}),
                (filters) => ({ filters }),
            ),
        ),

        returnIsMobile: new Duck.Selector((selectors) =>
            createSelector(selectors.getIsMobile, (showMobile) => ({
                showMobile,
            })),
        ),

        openMobileFilterModal: new Duck.Selector((selectors) =>
            createSelector(
                (state) =>
                    _get(
                        selectors.getAllStates(state),
                        'showMobileFilterModal',
                        false,
                    ),
                (showMobileFilterModal) => ({
                    showMobileFilterModal,
                }),
            ),
        ),

        getAllExteriorColors: new Duck.Selector((selectors) =>
            createSelector(
                (state) =>
                    _get(selectors.getAllStates(state), 'exteriorColors', {}),
                (exteriorColors) => ({ exteriorColors }),
            ),
        ),

        getAllInteriorColors: new Duck.Selector((selectors) =>
            createSelector(
                (state) =>
                    _get(selectors.getAllStates(state), 'interiorColors', {}),
                (interiorColors) => ({ interiorColors }),
            ),
        ),
        getQuery: new Duck.Selector((selectors) =>
            createSelector(
                (state) => _get(selectors.getAllStates(state), 'query', {}),
                (query) => ({ query }),
            ),
        ),
    }),
});

export default duckCreator;
