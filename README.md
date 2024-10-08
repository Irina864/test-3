# Файловая структура

## App

В папке app хранится маршрутизация (страницы) и глобальные стили. Каждая страница расположена в отдельной папке. Папки со страницами называются со строчной буквы в *kebab-case (*что является URL адресом страницы /user - папка user). Файл страницы называется page.jsx.

## Components

В папке components - компоненты. Каждый компонент расположен в отдельной папке. Папки с компонентами называются с заглавной буквы в CamelCase. Файл компонента называется в соответствии с наименованием папки, файл со стилями - CamelCase.module.scss.

## Images

Изображения хранятся в папке public/images. Группы изображений одного типа (иконки соцсетей, картинки для баннера, картинки определенного компонента) хранятся в отдельной папке. Папки называются сообразно с назначением изображений, со строчной буквы в сamelCase. Изображения называются в соответствие с содержанием (чтобы другой разработчик мог понять), со строчной буквы в kebab-case. Изображения если в формате png.

## UI

"UI" В папке ui хранятся элементы пользовательского интерфейса (кнопки, переключатели, инпуты, табы), которые подразумевают массовое переиспользование. Каждый ui элемент расположен в отдельной папке. Папки с ui элементами называются с заглавной буквы в CamelCase. Файл элемента называется в соответствии с назначением в CamelCase, файл со стилями - camelCase.module.scss.

## Store

В папке store хранятся с состояниями компонентов. На проекте используется Redux Toolkit.

## Библиотеки

При необходимости использования сторонних библиотек, которые на проекте в данный момент не используется, их загрузка согласовывается с челнами команды.

# Код-стайл

## Общий синтаксис

; - каждое объявление заканчивается точкой с запятой
↹ интервалы - каждый новый уровень вложенности отделяется табом
{ шаблонные строки } - используются вместо сложного объединения строк
‘ ’ - используются одинарные кавычки, вместо двойных
пробелы - не ставятся пробелы в конце строк и в пустых строках
=== - используется строгая проверка на равенство (кроме проверки на равенство null)

## Комментирование

!!! Если вы собираетесь оставить комментарий, сначала подумайте, можно ли что-то изменить в коде, чтобы его не писать. поясняющий комментарий должен быть емким (кратким и понятным)

## Именование переменных

Наименование переменных, функций и компонентов должно четко описывать назначение (функционал) этого элемента. функции выполняют только одну цель, которая отражена в их названии сокращения допустимы в пределах читаемости; нежелательно использование цифр в названиях; недопустимы названия из одной буквы;

## Страницы

Каждая страница - это функциональный React-компонент, собранный из других компонентов. Компонент страницы называется с заглавной буквы в CamelCase.

## Компоненты

Компонент (в том числе ui компонент) создается как функциональный компонент. Компонент называется с заглавной буквы в CamelCase.
Компонент экспортируется по умолчанию.

## Стили

Стили пишем с использованием препроцессора SCSS. Импорт стилей в компонентах называется styles. Глобальные CSS переменные хранятся в файле globals.scss.

# Наименование веток

## Название ветки

Название ветки разработчика должно называться с dev\_(имя пользователя).
Если возникнет необходимость в дорполнительной ветки для создания какой-либо функциональности:

dev\_(имя пользователя)/описание функциональности через kebab-case

dev_name/change-file-names.

# Пулл реквест

После того, как запушили коммит, создаем пулл реквест из вашей ветки в dev.
В reviewers можно тегнуть кого-то по желанию, либо оставить пустым.
В assignees отмечаете себя.
Дожидаемся ревью, если нет, то исправляем.
После согласования пулл реквеста, мержите ветку в dev.
