console.log('nav.js loaded');
const homeButton = document.querySelector('#home-button');
const dashboardButton = document.querySelector('#dashboard-button');
const loginButton = document.querySelector('#login-button');
const logoutButton = document.querySelector('#logout-button');

if(loginButton){
    console.log('logged in button found');
}

if(logoutButton){
    console.log('logged out button found');
}

homeButton.addEventListener('click', () => {
    document.location.replace('/');
});

dashboardButton.addEventListener('click', () => {
    document.location.replace('/dashboard');
});

if(loginButton){
    loginButton.addEventListener('click', () => {
        console.log('login button clicked');
        document.location.replace('/login'); //TODO: add the logout route
    });
}

if(logoutButton){
    logoutButton.addEventListener('click', () => {
        console.log('logout button clicked');
        document.location.replace('/logout'); //TODO: add the login route
    });
}
