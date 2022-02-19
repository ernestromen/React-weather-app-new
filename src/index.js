import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider  } from 'react-redux';
import { createStore } from 'redux';
import Header from './components/header/Header.js';
import {Home} from './components/Home';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import mainReducer from './reducers/mainReducer';
import { PersistGate } from 'redux-persist/integration/react';
import {List} from './components/List/List';
// export default store;

const persistConfig = {
  key: 'root',
  storage,
}
// let store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

const persistedReducer = persistReducer(persistConfig, mainReducer);
let  store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );
let persistor = persistStore(store);
export default store;

ReactDOM.render(
  <React.StrictMode>


<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>

<BrowserRouter>
    <Switch>
    <div className="App">

<Header/>

<Route   exact  path='/list' component={List} />

      <Route   exact  path='/' component={Home} />


</div>
</Switch>
    </BrowserRouter>
    </PersistGate>

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
