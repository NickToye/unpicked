import { GET_MAJOR_KEY_TYPE, GET_MINOR_KEY_TYPE, KeyTypesType, KeyTypeActionTypes } from '../types/keyTypes.type';

const initialState: KeyTypesType = {
    loading: false,
    keyType: 'Major',
};

const keyTypes = (state = initialState, action: KeyTypeActionTypes): any => {
    switch (action.type) {
        case GET_MAJOR_KEY_TYPE:
            return {
                ...state,
                keyType: 'Major',
            };
        case GET_MINOR_KEY_TYPE:
            return {
                ...state,
                keyType: 'Minor',
            };
        default:
            return state;
    }
};

export default keyTypes;
