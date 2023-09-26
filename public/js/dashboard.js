console.log('dashboard.js loaded');
const newPostButton = document.querySelector('#new-post-button');
const expandablePosts = document.querySelectorAll('.expandable');
const deletePostButtons = document.querySelectorAll('.delete-post-button');

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

expandablePosts.forEach((post) => {
    post.addEventListener('click', (event) => {
        const id = post.id;
        //console.log(id);
        console.log(`post ${id} clicked, expanding post`);
        console.log("post: ");
        console.log(post);
        if(post.classList.contains('expanded')){
            closePost(post);
        }
        else{
            closeAllPosts();
            expandPost(post);
        }
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