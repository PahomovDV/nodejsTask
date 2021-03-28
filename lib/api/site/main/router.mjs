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

// Files
router.post('/files/:type/', checkSession, busboy, controllers.files.create);

// Films
router.post('/films',       controllers.films.create);
router.get('/films/:id',    controllers.films.show);
router.put('/films/:id',    controllers.films.update);
router.delete('/films/:id', controllers.films.delete);
router.get('/films',        controllers.films.list);

router.get('/', (req, res) => {
    res.render('main/films/index', { title: 'Registration form' });
});


export default router;
