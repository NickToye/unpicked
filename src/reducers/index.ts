import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import keyTypes from './keyTypes.reducer';

export default function createRootReducer(history: History): any {
    return combineReducers({
        router: connectRouter(history),
        keyTypes,
    });
}
