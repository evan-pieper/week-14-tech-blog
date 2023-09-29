console.log('dashboard.js loaded');
const newCommentButtons = document.querySelectorAll('.new-comment-button');
const expandablePosts = document.querySelectorAll('.expandable');
//const deleteCommentButtons = document.querySelectorAll('.delete-comment-button');
const cancelCommentButtons = document.querySelectorAll('.cancel-comment-button');
const submitCommentButtons = document.querySelectorAll('.submit-comment-button');

const submitComment = async (event) => {
    event.preventDefault();
    console.log("submit comment called");
    const blogpost = event.target.parentElement.parentElement.parentElement;
    //console.log(blogpost);
    const commentContent = blogpost.querySelector('.comment-content').value;
    console.log(commentContent);
    const blogpostId = blogpost.id; // TODO: change this to the id of the post that the comment is being made on ***********
    if (commentContent) {
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/comments/${blogpostId}`, {
          method: 'POST',
          body: JSON.stringify({ commentContent }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          // If successful, redirect the browser to the homepage
          document.location.replace('/');
        } else {
          console.log(response.statusText);
          alert("Error: comment not created");
        }
    }
    else{ alert("Error: missing comment content"); }
   
};

//submitCommentButtons.addEventListener('click', submitComment); // when post function is working, change this to make the form visible instead of calling the form handler, then add a submit button to the form that calls the form handler        ************Add this back in later************

const expandPost = (clickedPost) => {
    console.log("expandPost called on post: " + clickedPost.id);
    clickedPost.classList.add('expanded');
};

const closePost = (clickedPost) => {
    console.log("closePost called on post: " + clickedPost.id);
    clickedPost.classList.remove('expanded');
}

const closeAllPosts = () => {  
    console.log("closeAllPosts called");
    const expandedPosts = document.querySelectorAll('.expanded');
    expandedPosts.forEach((expandedPost) => {
        closePost(expandedPost);
    });
};

closeAllComments = () => {
    const currentCommenting = document.querySelectorAll('.commenting'); // get all posts that are currently being edited
    currentCommenting.forEach((comment) => {
        comment.classList.remove('commenting'); // remove editing class from each post
        console.log("post " + comment.id + " is no longer being commented on");
    });
};

newCommentButtons.forEach((button) => { // add event listener to each edit button, so that when it is clicked, the post is considered commented on
    button.addEventListener('click', (event) => {
        event.preventDefault();
        closeAllComments(); // close all other edits before opening a new one
        const post = event.target.parentElement.parentElement; // get the post that the button is in (the button is in the form, which is in the post)
        console.log(post);
        post.classList.add('commenting'); // add editing class to post
        console.log("post " + post.id + " is now being commented on");
    });
});

cancelCommentButtons.forEach((button) => { // add event listener to each cancel edit button, so that when it is clicked, the post is no longer being edited
    button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation(); // prevent the post from being closed when the cancel button is clicked
        closeAllComments();
        //at this point the post window reloads itself for some reason, so the post is unexpanded (fix so that the post stays expanded when the cancel button is clicked)
    });
});

expandablePosts.forEach((post) => {
    post.addEventListener('click', (event) => {
        const id = post.id;
        //console.log(id);
        console.log(`post ${id} clicked, expanding post`);
        //console.log("post: ");
        //console.log(post);
        if(post.classList.contains('commenting')){ // if post is being edited, don't expand it
            console.log("post is being commented on, aborting post close");
            return;
        }
        if(post.classList.contains('expanded')){ // if post is already expanded, close it (if its not being edited)
            //closePost(post); old: close the post if its not being edited but is expanded. New: close the post if its expanded, regardless of whether its being edited
            console.log("post is already expanded, cannot expand it");
            return;
        }
        else{ // if post is not expanded, close all other posts and expand it
            closeAllPosts();
            expandPost(post);
        }
    });
});

submitCommentButtons.forEach((button) => {    //TODO: when the cancel edit button is clicked, the edit form is closed, but the post is still expanded
    button.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log("submit comment button clicked");
        const post = button.parentElement.parentElement.parentElement;
        console.log(post); //***
        const blogpostId = post.id;
        console.log(`attempting to submit comment to post ${blogpostId}`);
        const commentContent = post.querySelector('.comment-content').value;
        if (commentContent) {
            // Send a POST request to the API comments endpoint
            const response = await fetch(`/api/comments/${blogpostId}`, {
              method: 'POST',
              body: JSON.stringify({ commentContent }),
              headers: { 'Content-Type': 'application/json' },
            });
        
            //console.log(response);
            if (response.ok) {
                alert("Comment posted successfully");
                // If successful, redirect the browser to the homepage
                document.location.replace('/');
            } else {
                console.log(response.statusText);
                alert("Error: comment not posted");
            }
        }
        else{ alert("Error: missing comment description"); }
    });
});

/*deleteCommentButtons.forEach((button) => {                 Needs a lot of extra work. Do after MVP
    button.addEventListener('click', async (event) => {
        console.log("delete comment button clicked");
        const id = event.target.parentElement.id;
        console.log(`attempting to delete post ${id}`);
        const response = await fetch(`/api/blogposts/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    });
}); */