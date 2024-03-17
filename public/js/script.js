const loginForm = document.getElementById('loginForm');

const storeUserData = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
};
const getUserData = () => {
    return JSON.parse(localStorage.getItem('user'));
};
const removeUserData = () => {
    localStorage.removeItem('user');
};
const createFetchHeader = () => {
    const user = getUserData();
    if(user){
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        };
    }
    return {
        'Content-Type': 'application/json'
    };
};

if(loginForm){
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if(data.error){
                alert(data.error);
            } else {
                storeUserData(data);
                window.location.href = '/';
            }
        }).catch((err) => {
            console.log(err);
        });
    });
}