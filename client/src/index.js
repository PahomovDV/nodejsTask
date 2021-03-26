import 'babel-polyfill';

import $ from 'jquery';
import Main from './Main.js';

$(document).ready(() => {
    const main = new Main();

    main.init();
});
