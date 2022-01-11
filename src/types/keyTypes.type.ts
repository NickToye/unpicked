export const GET_MAJOR_KEY_TYPE = 'GET_MAJOR_KEY_TYPE';
export const GET_MINOR_KEY_TYPE = 'GET_MINOR_KEY_TYPE';

export type KeyTypesType = {
    loading: boolean;
    keyType: string;
};

export type GetMajorKeyType = {
    type: typeof GET_MAJOR_KEY_TYPE;
};

export type GetMinorKeyType = {
    type: typeof GET_MINOR_KEY_TYPE;
};

export type KeyTypeActionTypes = GetMajorKeyType | GetMinorKeyType;
