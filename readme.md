# Тестовое задание

## Для начала создайте и заполните .env файл по примеру из файла .env.example

## Для регистрации и аутентификации:
/register
```
{
	"username":"User Name",
	"password":"Password"
}
```
/login
```
{
	"username":"User Name",
	"password":"Password"
}
```

## Для создания записи
/records, method "POST"
Пример тела запроса:
```
{
	"data":"Some record"
}
```

## Для получения всех записей
/records, method "GET"
Пример ответа:
```
{
	"error": false,
	"message": "Records fetched.",
	"statusCode": 200,
	"data": {
		"id": 2,
		"userId": 1,
		"data": "Some rec edited",
		"createdAt": "2024-04-16T21:28:23.233Z",
		"updatedAt": "2024-04-16T21:35:45.241Z"
	}
}
```

## Для получения записи по id
/records/:id, method "GET"

## Для изменения записи
/records/:id, method "PUT"
Пример тела запроса:
```
{
	"data":"Some record edited"
}
```

## Для удаления записи
/records/:id, method "DELETE"

## Запуск проекта:
```cmd
npm start
```