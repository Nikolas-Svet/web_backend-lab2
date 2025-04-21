export const API_PREFIX = '/api/lab2/';

// Messages for frontend

export enum ErrorMessages {
    InternalServerError = 'Внутренняя ошибка сервера',
    NotFound = 'Ресурс не найден',
    Unauthorized = 'Неавторизованный доступ',
    // Авторизация
    Auth = 'Неверный логин или пароль',
    AuthValidation = 'Логин и пароль обязательны',
    // Регистрация
    RegSuccessful = 'Пользователь зарегистрирован',
    RegValidationNickname = 'Пользователь с таким логином уже существует',
    RegValidationRole = 'Роль должна быть student или teacher',
    RegValidationAll = 'Все поля обязательны',
    // Удаление пользователя
    delSuccessful = 'Пользователь удалён',
    // Получение данных о пользователе
    GetInfoNotAuth = 'Пользователь не авторизован',
    // Общее для пользователя
    NotFoundUser = 'Пользователь не найден',
    // Курсы
    NotFoundCourse = 'Курс не найден',
    ValidationId = 'Некорректный ID курса',
    CourseDelSuccessful = 'Курс успешно удалён'
}

