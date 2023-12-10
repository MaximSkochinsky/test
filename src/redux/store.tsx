import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';


const persistentState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {}


const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;


const store = () => createStore(rootReducer, persistentState, composeEnhancers(applyMiddleware(thunk)));

const Store = store();


Store.subscribe(() => {
    const state = Store.getState();
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  })

export default Store;