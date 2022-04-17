# lozova_bot

## Описание

Бот сообщества г. Лозовая для информирования, оповещения, помощи и т.д

## Требования

NodeJS v16.14.2

## Как запустить

1. Скачать проект
2. Установить зависимости `npm install`
3. В корне проекта создать файл .env
4. Добавить в файл переменные из таблички ниже
5. Запустить проект `npm run start`

## Heroku deploy

1. Регистрируемся на Heroku [Heroku register](https://id.heroku.com/signup/login)
2. Открывает dashboard и создаём приложение на nodejs [Dashboard](https://dashboard.heroku.com/apps)
3. Вводим имя приложения, регион Europe
4. В настройках приложения в config vars добавляем два поля.
5. Установить heroku на комп [Set up](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
6. Скачать проект
7. В терминале залогиниться на heroku командой `heroku login`
8. Следующая команда `heroku git:remote -a имя_проекта`
9. Последний этап `git push heroku main`

## Переменные среды

| Name                  | is required | description                               | example    |
| --------------------- | ----------- | ----------------------------------------- | ---------- |
| TELEGRAM_TOKEN        | YES         | Токен от телегрма бота                    | 12345      |
| NOTIFICATION_GROUP_ID | YES         | ид группы, куда будут приходить сообщения | -123219094 |

> P.s ид группы можно получить, если добавить в группу бот @RawDataBot, в поле chat: {id: 123} будет отображено ид группы ( оно может поменяться, при переходе группы в супер-группу).
