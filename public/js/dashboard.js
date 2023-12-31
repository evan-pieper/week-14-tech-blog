console.log('dashboard.js loaded');
const newPostButton = document.querySelector('#new-post-button');
const expandablePosts = document.querySelectorAll('.expandable');
const deletePostButtons = document.querySelectorAll('.delete-post-button');
const editPostButtons = document.querySelectorAll('.edit-post-button');
const cancelEditButtons = document.querySelectorAll('.cancel-edit-button');
const saveEditButtons = document.querySelectorAll('.save-edit-button');

const NewPostFormHandler = async (event) => {
    event.preventDefault();
    console.log("new post form handler called");
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    if (title && content) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/blogposts/', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          // If successful, redirect the browser to the profile page
          document.location.replace('/dashboard');
        } else {
          console.log(response.statusText);
          alert("Error: post not created");
        }
    }
    else{ alert("Error: missing title or description"); }
   
};

newPostButton.addEventListener('click', NewPostFormHandler); // when post function is working, change this to make the form visible instead of calling the form handler, then add a submit button to the form that calls the form handler

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

cancelEditButtons.forEach((button) => { // add event listener to each cancel edit button, so that when it is clicked, the post is no longer being edited
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

editPostButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
        console.log("edit post button clicked");
        const post = button.parentElement;
        const id = post.id;
        console.log(`attempting to edit post ${id}`);
        handleEditPost(post);
    });
});

saveEditButtons.forEach((button) => {    //TODO: when the cancel edit button is clicked, the edit form is closed, but the post is still expanded
    button.addEventListener('click', async (event) => {
        console.log("save edit button clicked");
        const post = button.parentElement;
        const id = post.id;
        console.log(`attempting to save edit to post ${id}`);
        const editTitle = post.querySelector('.editTitle').value;
        const editContent = post.querySelector('.editContent').value;
        if (editTitle && editContent) {
            // Send a POST request to the API endpoint
            const response = await fetch(`/api/blogposts/${id}`, {
              method: 'PUT',
              body: JSON.stringify({ editTitle, editContent }),
              headers: { 'Content-Type': 'application/json' },
            });
        
            console.log(response);
            if (response.ok) {
                alert("Post updated successfully");
                // If successful, redirect the browser to the profile page
                document.location.replace('/dashboard');
            } else {
                console.log(response.statusText);
                alert("Error: post not updated");
            }
        }
        else{ alert("Error: missing title or description"); }
    });
});

deletePostButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
        console.log("delete post button clicked");
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
});