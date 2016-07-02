import express from 'express';

const router = express.router();

router.post('/signup', (req, res) => {
    /* to be implemented */
    res.json({ success: true });
});

router.post('/signin', (req, res) => {
    /* to be implemented */
    res.json({ success: true });
});

export default router;
