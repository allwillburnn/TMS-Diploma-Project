<h3 align="center"> Frameworks </h3>

Unit tests - Jest  
API tests -  Jest + Axios  
E2E tests - Cypress  

------------

<h3 align="center"> Commands </h3>

Run only unit tests (Jest)
`npm run jest-unit-tests`

Run only api tests (Jest)
`npm run jest-api-tests`

Run E2E tests (Cypress)
`npm run cypress-e2e-tests`

Run all tests
`npm run run-all-tests`

------------

<h3 align="center"> Tasks </h3>

<details>
<summary>Task 1</summary>

### Task 1 💻
- Класс регистрационная форма. Описать каждое поле формы методом, входными и выходными значениями.
- Создать тестовый фреймворк для юнит тестов по описанной регистрационной форме:
	- тестовый фреймворк брать на свое усмотрение: Mocha или Jest

### Класс "Регистрационная форма"

#### Поля:

- email: string
- password: string
- username: string
- age: number
- termsAgreement: boolean, дефолт = false
- registered: bool, дефолт = false

#### Методы:

- setEmail(email: string) - записывает в поле класса введенный email, проверяет, что передан именно email с помощью регулярного выражения. Если нет, не записывает и дает понять, что пользователь ввел неверные данные (либо throw error, либо через return, либо console.log)
- setPassword(password: string) - записывает в поле класса введенный пароль, проверяя, что он не менее 8 символов и содержит хотя бы одну цифры. Если нет, все как в методе выше.
- setUsername(username: string) - записывает в поле класса введенныое имя юзера, если не пришла пустая строка. Если пришла, все как выше.
- setAge(age: number) - записывает в поле класса возраст, если он > 0 и меньше 150. Если нет, делает как указано выше.
- agreeWithTerms() - переключает boolean поле в true
- register() - успешно регистрирует пользователя, возвращая сообщение об успехе, содержащее дату и время регистрации, через return в том случае, если все поля правильно заполнены, и пользователь согласился с условиями регистрации. Если что-то не так, выводит через return сообщение с информацие о том, что конкретно не так. Также, в случае успешной регистрации, ставит поле registered в true

</details>

<details>
<summary>Task 2</summary>

### Task 2 💻
Создать тестовый фреймворк для API (интеграционных) тестов для web приложения https://jsonplaceholder.typicode.com/:
- тестовый фреймворк: Jest + superAgent

Создаем апи-тесты по следующему чек-листу:
- Для эндпоинта /posts:
  - Пользователь может получить все посты
  - Пользователь может получить пост по его Id
  - Пользователь должен получить ошибку 404 при попытке получить пост с несуществующим Id
  - Пользователь может получить все посты для конкретного пользователя по userId
  - Пользователь получит пустой массив при попытке получить посты для несуществующего юзера
  - Пользователь может получить все комментарии к посту по его Id
  - Пользователь получит пустой массив при попытке получить комментарии к несуществующему посту
  - Пользователь может создать новый пост
  - Пользователь может обновить заголовок (title) существующего поста
  - Пользователь может удалить пост по Id
- Для эндпоинта /albums:
  - Пользователь может получить все альбомы
  - Пользователь может получить альбом по его Id
  - Пользователь может получить все альбомы конкретного пользователя по userId
  - Пользователь может добавить новый альбом
- Для эндпоинта /photos:
  - Пользователь может получить все фото в альбоме по его Id
  - Пользователь может получить конкретное фото по его Id
  - Пользователь может загрузить новое фото
  - Пользователь не может загрузить новое фото, не указав albumId
  - Пользователь не может загрузить новое фото, указав Id несуществующего альбома.

Требования к выполнению задания:
- Должен быть реализован фреймворк с явной структурой, а не файл с тестами.
- Базовые api методы должны быть вынесены в отдельный файл.
- Тестовые данные должны храниться отдельно от тестов.
- Для GET запросов проверяем не только статус код, но еще и пришедшие данные.
- Методы, относящиеся к разным эндпоинтам, должны быть реализованы в отдельных файлах.
- Не забывайте про чистоту кода и отступы.
- В проекте не должно быть пакетов, напрямую не относящихся к заданию и не используемых в процессе выполнения.

</details>

<details>
<summary>Task 3</summary>

### Task 3 💻
Создать тестовый фреймворк с UI-тестами для сайта https://www.onliner.by/:
- стек на выбор: Cypress / Playwright / WDIO / WDIO + Cucumber

Создаем UI-тесты по тест-кейсам из этой гугл-таблицы:
https://docs.google.com/spreadsheets/d/1L9Cov_FCGOyyVvJ-DbWEFN4eCkt7fkmEg_kXKYbG3Qo/edit?usp=sharing

Требования к выполнению задания:
- Тесты, которые используют логин, должны делать это с помощью cookies. Гайд по cookies login to Onliner есть в чате группы.
- Все константы и текстовые данные должны быть вынесены в отдельную часть фреймворка.
- Паттерн Page Object обязателен.

</details>
