const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Choices = require('inquirer/lib/objects/choices');
//const DataRepository = require('./data-repository');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'tachki777',
    database: 'emp_trackDB'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);

});

connection.query(
   // 'SELECT title, id, Department_name, salary, FROM Role INNER JOIN Department ON Role.department_id=Department.id'
'SELECT first_name, last_name FROM Employee E1, Employee E2 WHERE E1.Employee.id=E2.Employee.manager_id'

       , function (err, result) {
        console.table(result);
    })
    





