# Thing Rating 

Помогает запоминать и делиться своими впечатлениями о сделанном выборе. Будь то пельмени из ближайшего магазина, автосервис, фильм или персонаж в Mortal Kombat - всё что вы когда то выбрали и в последующем хотите выбрать, оптимально опираясь на предыдущий опыт.

***

Ознакомиться с работающим проектом можно здесь [Thing Rating](https://eugene-axe.github.io/)

***

**Backend** 
- Выполнен на node.js
- фреимфорк express.js
- Backend api размещен на ~~ Heroku ~~ (после того как Heroku стал платным переехал на Railway и работает 21 день в месяц) 
- GraphQL - способ обработки запросов  (Apollo Server)

**Frontend**
- Выполнен на библиотеке React 
- сборщик Parcel
- за стилизацию компонентов отвечает Styled-Components
- Для загрузки и хранения картинок выбран сторонний сервис - imageBan.  
- Взаимодействие с imageBan происходит REST запросом.
- Взаимодействие с backend через GraphQL запросы с помощью Apollo client.  

**DataBase** 
- MongoDB на MongoDB Atlas

***

Данное приложение представляет собой структурированный набор карточек. Карточка хранит в себе информацию о какой-то вещи:
-	название
-	описание
-	категорию
-	настройку приватности
-	числовую оценку
-	изображения , до 3-ех
-	Имя автора
-	дата добавления

В приложении возможна регистрация пользователя, путем сохранения уникального token в localStorage с последующими проверками на backend при каждом запросе. Использование без регистрации возможно, но с ограниченной функциональностью. Так зарегистрированный пользователь может добавлять, а впоследствии удалять и редактировать собственные карточки. Пользователь может сделать карточку видимой для всех или для себя.
Добавление карточки происходит в отдельной форме. Форма умеет валидировать поля по обязательности заполнения, ограничение на количество символов и ограничение величины значения.
Реакцией на некоторые существенные действия пользователя , а так же возможные предупреждения, становится появление короткого всплывающего сообщения в левом-нижнем углу экрана.
На данный момент навигацию в карточках, возможно, осуществлять или пролистыванием ленты или через меню "Категорий". Выбор определенной категории сужает область поиска требуемых каточек, таким образом, чем вложеннее категория, тем уже критерий поиска.
Приложение адаптивно за счет применения технологий _Grig_ , _Flex-box_ и _media_ запросов


****

Планы на будущее: 
 - [ ] панель поиска и сортировки
 - [ ] Пагинация
 - [ ] Service Worker
 - [ ] Интернационализация

Сервер иногда не работает (так как бесплатный ), поэтому приложу скрины, что бы было если б он работал: ![image](https://user-images.githubusercontent.com/64367189/224029856-bfa6ec6b-3acc-48ab-abb5-de35d920b222.png)
![image](https://user-images.githubusercontent.com/64367189/224031071-0eb336a9-f0dc-48f8-823b-ede1774d4ea8.png)
![image](https://user-images.githubusercontent.com/64367189/224031266-f835bc71-5c03-44ab-9534-190c34b34f80.png)![image](https://user-images.githubusercontent.com/64367189/224031450-815a9fa3-aaeb-406e-b638-1d67071d1d55.png)



