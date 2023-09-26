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

router.delete('/:id', async (req, res) => {
    try {
        const blogpostData = await Blogpost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogpostData) {
            res.status(404).json({ message: 'No blogpost found with this id!' });
            return;
        }

        res.status(200).json(blogpostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const blogpostData = await Blogpost.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            }
        );

        if (!blogpostData) {
            res.status(404).json({ message: 'No blogpost found with this id!' });
            return;
        }

        res.status(200).json(blogpostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;