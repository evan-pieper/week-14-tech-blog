console.log('nav.js loaded');
const homeButton = document.querySelector('#home-button');
const dashboardButton = document.querySelector('#dashboard-button');
const loginButton = document.querySelector('#login-button');
const logoutButton = document.querySelector('#logout-button');
//const logout = require('./logout');

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
        document.location.replace('/login');
    });
}

const logout = async () => {
    console.log("attempting to call users/logout route");
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      console.log("logout successful, redirecting to logout page");
      document.location.replace('/logout');
    } else {
      alert(response.statusText);
    }
};

if(logoutButton){
    logoutButton.addEventListener('click', logout);
}