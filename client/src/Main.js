import './Components/main.scss';
import config from '../assets/config.json';
import Dispatcher from './Modules/Dispatcher.js';
import Api from './Modules/Api.js';

export default class App {
    init() {
        // eslint-disable-next-line more/no-window
        window.config = config;
        // eslint-disable-next-line more/no-window
        window.api = new Api({ baseUrl: config.apiBaseUrl });

        this.initDispatcher();
        this.eventBinder();
    }

    eventBinder = () => {

    }

    initDispatcher = () => {
        const dispatcher = new Dispatcher();

        dispatcher.dispatch();
    };
}
