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


const choisesSet = ['View all departments',
  'View all roles',
  'View all employees',
  'Add a role',
  'Add an employee',
  'Update an employee role',
  'Quit'
];

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "options",
      choices: choisesSet
    }
  ])
}

const runQuery = (prompt) => {
  let newQuery = ''
  const quaries = ['SELECT Department_name, id FROM Department',

  //job title, role id, the department that role belongs to, and the salary for that role
  'SELECT title, id, Department_name, salary FROM Role INNER JOIN Department ON Role.department_id=Department.id',

  //employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  'SELECT Employee.id, first_name, last_name, title, salary, Department_name FROM Employee INNER JOIN Role ON Employee.Role_id=Role.id LEFT JOIN Department ON Role.department_id=Department.id', 
  
  'update',
  

];

  for (let i = 0; i < choisesSet.length; i++) {
if(prompt.options === 'Quit'){
  connection.end();
  return;
     }
   else if (choisesSet[i] === prompt.options) {
      newQuery = quaries[i];

      connection.query(newQuery, function (err, result) {
        if (err){
          console.log(err);
        }
        console.table(result);
        
        promptUser().then(runQuery);
      })
    }
    
  }

};

promptUser().then(runQuery)


//}

// promptUser().then(runQuery);
// }
// );