import express                                             from 'express';


const router = express.Router();

// Main Page
router.get('/', async (req, res) => {
    res.render('site/index', { title: 'BIG TITLE', message: 'HELLO! My DEAR' });
});

export default router;
