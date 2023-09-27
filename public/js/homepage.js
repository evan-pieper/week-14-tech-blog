console.log('dashboard.js loaded');
const newCommentButton = document.querySelector('#new-comment-button');
const expandablePosts = document.querySelectorAll('.expandable');
const deleteCommentButtons = document.querySelectorAll('.delete-comment-button');
const cancelCommentButtons = document.querySelectorAll('.cancel-comment-button');
const submitCommentButtons = document.querySelectorAll('.submit-comment-button');

const NewCommentFormHandler = async (event) => {
    event.preventDefault();
    console.log("new comment form handler called");
    const content = document.querySelector('#content').value.trim();
    const blogpostId = 1; // TODO: change this to the id of the post that the comment is being made on ***********
    if (content) {
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/comments/${blogpostId}`, {
          method: 'POST',
          body: JSON.stringify({ title, content }),
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

newCommentButton.addEventListener('click', NewCommentFormHandler); // when post function is working, change this to make the form visible instead of calling the form handler, then add a submit button to the form that calls the form handler

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

const handleEditPost = async (post) => {
    closeAllEdits(); // close all other edits
    post.classList.add('editing'); // add editing class to post
    console.log("post " + post.id + " is now being edited");
};

const closeAllEdits = () => {
    const currentEdits = document.querySelectorAll('.editing'); // get all posts that are currently being edited
    currentEdits.forEach((edit) => {
        edit.classList.remove('editing'); // remove editing class from each post
        console.log("post " + edit.id + " is no longer being edited");
    });
};

cancelCommentButtons.forEach((button) => { // add event listener to each cancel edit button, so that when it is clicked, the post is no longer being edited
    button.addEventListener('click', async (event) => {
        event.stopPropagation();  // prevent the event from bubbling up to the post, which would cause the post to try and close
        closeAllEdits();
    });
});

expandablePosts.forEach((post) => {
    post.addEventListener('click', (event) => {
        const id = post.id;
        //console.log(id);
        console.log(`post ${id} clicked, expanding post`);
        console.log("post: ");
        console.log(post);
        if(post.classList.contains('editing')){ // if post is being edited, don't expand it
            console.log("post is being edited, aborting post close");
            return;
        }
        if(post.classList.contains('expanded')){ // if post is already expanded, close it (if its not being edited)
            closePost(post);
        }
        else{ // if post is not expanded, close all other posts and expand it
            closeAllPosts();
            expandPost(post);
        }
    });
});

submitCommentButtons.forEach((button) => {    //TODO: when the cancel edit button is clicked, the edit form is closed, but the post is still expanded
    button.addEventListener('click', async (event) => {
        console.log("submit comment button clicked");
        const post = button.parentElement;
        const blogpostId = post.id;
        console.log(`attempting to submit comment to post ${id}`);
        const commentContent = post.querySelector('.commentContent').value;
        if (commentContent) {
            // Send a POST request to the API endpoint
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