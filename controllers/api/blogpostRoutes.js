const router = require('express').Router();
const { Blogpost } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newBlogpost = await Blogpost.create({
        ...req.body,
        user_id: req.session.user_id,
        });
    
        res.status(200).json(newBlogpost);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;