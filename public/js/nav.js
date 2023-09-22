console.log('nav.js loaded');
const homeButton = document.querySelector('#home-button');
const dashboardButton = document.querySelector('#dashboard-button');
const loginButton = document.querySelector('#login-button');
const logoutButton = document.querySelector('#logout-button');

let loggedIn = false;
if(loginButton){
    loggedIn = true;
}

homeButton.addEventListener('click', () => {
    document.location.replace('/');
});

dashboardButton.addEventListener('click', () => {
    document.location.replace('/dashboard');
});

if(loggedIn){
    loginButton.addEventListener('click', () => {
        loggedIn = false;
        document.location.replace('/logout'); //TODO: add the logout route
    });
}

if(!loggedIn){
    logoutButton.addEventListener('click', () => {
        loggedIn = true;
        document.location.replace('/login'); //TODO: add the login route
    });
}
