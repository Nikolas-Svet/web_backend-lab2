const apiBaseUrl = '';

let token = '';
let userId = '';

const API_PREFIX = '/api/lab2/'

const registrationForm = document.querySelector('.registration-form');
const loginForm = document.querySelector('.login-form');
const getProfile = document.querySelector('.get-profile');
const deleteAccount = document.querySelector('.delete-account');

registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.querySelector('.reg-firstName').value.trim();
    const lastName = document.querySelector('.reg-lastName').value.trim();
    const username = document.querySelector('.reg-username').value.trim();
    const password = document.querySelector('.reg-password').value;
    const role = document.querySelector('.reg-role').value;

    try {
        const response = await fetch(apiBaseUrl + `${API_PREFIX}auth/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName, lastName, username, password, role})
        });

        const data = await response.json();
        const msgDiv = document.querySelector('.registration-message');

        if (response.ok) {
            msgDiv.textContent = data.message;
            msgDiv.className = 'message';
        } else {
            msgDiv.textContent = data.message || 'Ошибка регистрации';
            msgDiv.className = 'error';
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('.login-username').value.trim();
    const password = document.querySelector('.login-password').value;

    try {
        const response = await fetch(apiBaseUrl + `${API_PREFIX}auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });

        const data = await response.json();
        const msgDiv = document.querySelector('.login-message');

        if (response.ok && data.token) {
            token = data.token;
            localStorage.setItem('token', token);
            msgDiv.textContent = 'Вход выполнен успешно. Токен сохранён.';
            msgDiv.className = 'message';
        } else {
            msgDiv.textContent = data.message || 'Ошибка авторизации';
            msgDiv.className = 'error';
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});

getProfile.addEventListener('click', async () => {
    if (!token) {
        alert('Пожалуйста, выполните вход.');
        return;
    }
    try {
        const response = await fetch(apiBaseUrl + `${API_PREFIX}user/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();
        const resultPre = document.querySelector(".profile-result");
        if (response.ok) {
            resultPre.textContent = JSON.stringify(data, null, 2);
            if (data._id) {
                userId = data._id; // сохраняем id пользователя для удаления
            }
        } else {
            resultPre.textContent = data.message || 'Ошибка получения профиля';
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});

deleteAccount.addEventListener('click', async () => {
    if (!token) {
        alert('Пожалуйста, выполните вход.');
        return;
    }
    if (!userId) {
        alert('Сначала получите данные профиля, чтобы узнать ваш ID.');
        return;
    }
    if (!confirm('Вы уверены, что хотите удалить свой аккаунт?')) return;

    try {
        const response = await fetch(apiBaseUrl + `${API_PREFIX}user/` + userId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        const msgDiv = document.querySelector('.delete-message');

        if (response.ok) {
            localStorage.removeItem('token');
            msgDiv.textContent = data.message;
            msgDiv.className = 'message';
        } else {
            msgDiv.textContent = data.message || 'Ошибка удаления аккаунта';
            msgDiv.className = 'error';
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});
