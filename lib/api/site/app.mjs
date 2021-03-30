/* eslint import/imports-first:0  import/newline-after-import:0 */
import path          from 'path';
import express       from 'express';
import favicon       from 'serve-favicon';
import fileUpload    from 'express-fileupload';
import { promisify } from '../../../packages.mjs';

import logger        from '../logger.mjs';
import middlewares   from './middlewares.mjs';
import adminRouter   from './admin/router.mjs';
import mainRouter    from './main/router.mjs';

// Init app
const app = express();

app.use(middlewares.json);
app.use(middlewares.clsMiddleware);
app.use(middlewares.urlencoded);
app.use(middlewares.cors);
app.use(middlewares.include);
app.use(fileUpload());
app.use(favicon(`${path.resolve()  }/public/images/favicon.ico`));
app.use('/public', express.static('public'));
app.use('/admin', adminRouter);
app.use('/', mainRouter);
app.set('view engine', 'pug');
app.set('views', './views');

let server = null;

export function start({ sitePort }) {
    server = app.listen(sitePort, () => {
        const { port, address } = server.address();

        global.SITE_PORT = port; // For tests. TODO: export app and use it tests
        logger.info(`[SiteApiApp] STARTING AT PORT [${port}] ADDRESS [${address}]`);
    });

    server.closeAsync = promisify(server.close);
}

export async function stop() {
    if (!server) return;
    logger.info('[SiteApiApp] Closing server');
    await server.closeAsync();
}

export default app;
