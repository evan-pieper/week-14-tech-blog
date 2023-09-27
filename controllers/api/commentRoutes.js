const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/:post_id', async (req, res) => {  // get all comments for a specific blogpost
    try {
        const commentData = await Comment.findAll({
            where: {
                blogpost_id: req.params.id,
            },
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/*router.get('/', async (req, res) => {  // get all comments for the user that is logged in
    try {
        console.log("comment get route called");
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        console.log("error in comment get route");
        res.status(400).json(err);
    }
}); */

router.post('/:blogpost_id', async (req, res) => {  // create a new comment for a specific blogpost (req.params.id is the blogpost_id)
    try {
        const newComment = await Comment.create({
        ...req.body, //spreads the properties of the req.body object into this new object so that we can add the user_id property to it
        user_id: req.session.user_id, // add the user_id property to the new object (always going to be the user that is logged in because you can only comment when you are logged in)
        blogpost_id: req.params.blogpost_id,
        });
    
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {  // delete a comment with a specific id (req.params.id is the comment_id)
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;