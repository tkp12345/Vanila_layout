// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// import React from 'react';
// import { render } from 'react-dom';
// // import { BrowserRouter } from 'react-router-dom';
// // import axios from 'axios';
//
// import App from './App';
//
// // axios.defaults.withCredentials = true;
// // axios.defaults.baseURL =
// //     process.env.NODE_ENV === 'production' ? 'https://sleact.nodebird.com' : 'http://localhost:3090';
//
// render(<App />, document.querySelector('#app'));

import { $ } from './utills/util';

import App from './App';

new App($('#app'));
