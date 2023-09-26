console.log('dashboard.js loaded');
/*const newPostButton = document.querySelector('#new-post-button');
const editPostButtons = document.querySelectorAll('.edit-post-button');
const deletePostButtons = document.querySelectorAll('.delete-post-button');

newPostButton.addEventListener('click', () => {
    //document.location.replace('/newpost');  //TODO: add new post functionality
    console.log("new post button clicked"); 
});

editPostButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const id = event.target.getAttribute('data-id');
        //document.location.replace(`/editpost/${id}`); //TODO: add edit post functionality
        console.log(`edit post button clicked for post ${id}`);
    });
});

deletePostButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
        console.log("delete post button clicked");
        const id = event.target.getAttribute('data-id');
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