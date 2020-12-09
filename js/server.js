const mysql = require("mysql2");
const express = require('express'),
    app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "shop",
    password: "1234554321"
});


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const host = '127.0.0.1';
const port = 7000;

//когда мы делаем запрос по  'http://127.0.0.1:7000/api/users' срабатывает функция getitems
app.get('/api/users', (req, res) => { getItems(req, res) });// гет запрос используется для получения данных

app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));


function getItems(req, res) {
    // тестирование подключения
    connection.connect(function (err) { //подключение к бд
        if (err) {
            return console.error("Ошибка: " + err.message);
        }
        else {
            console.log("Подключение к серверу MySQL успешно установлено");

            connection.query("SELECT * FROM item",//выбираем все данные из таблицы айтемс
                function (err, results, fields) {
                    console.log(err);
                    console.log(results); // собственно данные
                    console.log(fields); // мета-данные полей 
                    res.send({ results: results });
                });
        }
    });
 
}






















