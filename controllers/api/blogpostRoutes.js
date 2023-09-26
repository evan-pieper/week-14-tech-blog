const router = require('express').Router();
const { Blogpost } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newBlogpost = await Blogpost.create({
        ...req.body, //spreads the properties of the req.body object into this new object so that we can add the user_id property to it
        user_id: req.session.user_id,
        });
    
        res.status(200).json(newBlogpost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/test', async (req, res) => {
    try{
        console.log("blogpost test route called");
    } catch (err) {
        console.log("error in blogpost test route");
        res.status(400).json(err);
    }
});

module.exports = router;