# Тестовое задание:
*Тестовое задание следует выполнять с помощью JavaScript. Необходимо развернуть у себя локально базу данных с фейковыми данными и построить REST API веб-приложение с 1 одной страницей (далее расписано конкретнее).*

- Для разворачивания базы данных локально следуйте инструкциям в файле CreateDatabase.txt <br></br>

- К полученной базе данных надо обращаться для получения данных для построения страницы.<br></br>

- На странице необходимо построить таблицу, вывдящую информацию по фильмам (таблица film в БД), со следующими столбцами:
    - ID фильма;
    - Название фильма;
    - Жанр фильма;
    - Количество просмотров (по таблице watch);
    - Рейтинг фильма;
    - Страна производитель;
    - Возрастное ограничение;
    - Дата выхода.<br></br><br></br>

- К таблице создать несколько фильтров:
    - Выбор пользователя - фильтрация по пользователям, смотревшим фильмы (таблица watch в БД);
    - Выбор языка для субтитров (показывать только фильмы с имеющимися субтитрами по выбранному языку) - таблица dubbed в БД;
    - Выбор языка для аудио (показывать только фильмы с имеющимися аудио по выбранному языку) - таблица dubbed в БД;
    - Фильтрация по жанрам - таблицы film_genres и genres в БД;
    - Поиск по названию фильма (поиск по подстроке).<br></br><br></br>

- В таблице реализовать возможность сортировки по столбцу количества просмотров.<br></br>

- Выполнить и прислать в отдельном файле следующие запросы к базе данных:
    - Вывести имена режиссёров, у которых средний рейтинг снятых ими фильмов не меньше 6.0 и для каждого режиссёра вывести соответствующий средний рейтинг - могут понадобиться таблицы film, director, film_directors;
    - Вывести список названий языков, для каждого языка вывести количество пользователей, использующих данный язык и количество фильмов, имеющих озвучку на данном языке. Упорядочить по количеству пользователей, использующих данный язык - могут понадобиться таблицы languages, use, dubbed.