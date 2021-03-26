import Navigo from 'navigo';
import routes from './Routes.js';

export default class Dispatcher {
    dispatch() {
        // eslint-disable-next-line more/no-window
        const { protocol, host } = window.location;
        const root = `${protocol}//${host}`;
        const router = new Navigo(root, false);

        // eslint-disable-next-line more/no-window
        window.router = router;

        const handlers = Object.keys(routes).reduce((acc, route) => {
            acc[route] = (params, query) => {
                const routeHandler = routes[route];
                const cont = new routeHandler.controller();
                const clearedParams = Object.entries(params || {}).filter(([, value]) => {
                    return typeof value !== 'undefined' && value !== 'undefined';
                }).reduce((a, [key, value]) => {
                    a[key] = value;

                    return a;
                }, {});

                cont[routeHandler.method](clearedParams, query);
            };

            return acc;
        }, {});

        router.on(handlers).resolve();
    }
}
