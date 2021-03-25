import express     from 'express';
import middlewares from '../middlewares.mjs';
import controllers from './controllers/index.mjs';

const router = express.Router();

const checkSession = controllers.sessions.check;
const busboy = middlewares.busboy;

// Actions
router.post('/actions/:id', controllers.actions.submit);

// Sessions
router.post('/sessions', controllers.sessions.create);

// Users
router.post('/users',                     controllers.users.create);
router.post('/users/resetPassword',       controllers.users.resetPassword);
router.get('/users/:id',    checkSession, controllers.users.show);
router.get('/users',        checkSession, controllers.users.list);
router.put('/users/:id',    checkSession, controllers.users.update);
router.delete('/users/:id', checkSession, controllers.users.delete);

// Files
router.post('/files/:type/', checkSession, busboy, controllers.files.create);

// Films
router.post('/films',       controllers.films.create);
router.get('/films/:id',    controllers.films.show);
router.put('/films/:id',    controllers.films.update);
router.delete('/films/:id', controllers.films.delete);
router.get('/films',        controllers.films.list);


export default router;
