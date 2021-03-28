import 'jquery';
import 'jquery-validation';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import 'datatables.net-bs4';
import 'datatables.net-buttons-bs4';
import './styles/style.scss';
import App from './App.js';

$(document).ready(() => {
    const app = new App();

    app.init();
});
