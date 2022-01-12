import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import { Store } from '../reducers/types';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
// const router = routerMiddleware(history);

function configureStore(initialState?: Record<string, never>): Store {
    return createStore(rootReducer, initialState);
}

export default { configureStore, history };
