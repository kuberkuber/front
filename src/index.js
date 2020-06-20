import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Root from './client/Root';
import rootReducer from './modules/index';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
const store = createStore(rootReducer,composeWithDevTools());
// import { BrowserRouter } from 'react-router-dom';

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
