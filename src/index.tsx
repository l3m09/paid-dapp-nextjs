import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";

import store from "./redux/store";

import * as serviceWorker from './serviceWorker';
//
// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// );

const render = () => {
    const App = require("./App").default;
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById("root")
    );
};

render();

if (process.env.NODE_ENV === "development" && module) {
    // @ts-ignore
    module.hot.accept("./App", render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
