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

//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const choisesSet = ['View all departments',
  'View all roles',
  'View all employees',
  'Add a Department',
  'Add a Role',
  'Add an Employee',
  'Update an Employee Role',
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
  if (prompt.options === 'Quit') {
    connection.end();
    return;
  }

  //enter the name of the department and that department is added to the database
  else if (prompt.options === 'Add a Department') {

    inquirer.prompt([
      {
        type: 'input',
        name: 'Depname',
        message: 'Enter Department Name:'
      }
    ]).then(function (name) {
      connection.query(
        'INSERT INTO Department SET ?',
        {
          Department_name: name.Depname
        },
        function (err, result) {
          if (err) {
            console.log(err);
          }
          console.log('\n',
            '------------------------------------------',
            '\n',
            'new Department *' + name.Depname + '* was Added',
            '\n',
            '------------------------------------------',
            '\n')
          promptUser().then(runQuery);
        }
      )
    })
  }
  //enter the name, salary, and department for the role and that role is added to the database
  else if (prompt.options === 'Add a Role') {

    inquirer.prompt([
      {
        type: 'input',
        name: 'Rolename',
        message: 'Enter New Role:'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter Salary:'
      },
      {
        type: 'list',
        name: 'Department',
        choices: [
          {
            name: 'Sales',
            value: 1,
          },
          {
            name: 'Engineering',
            value: 2,
          },
          {
            name: 'Finance',
            value: 3,
          },
          {
            name: 'Legal',
            value: 4,
          }
        ]
      },

    ]).then(function (name) {
      connection.query(
        'INSERT INTO Role SET ?',
        {
          title: name.Rolename,
          salary: name.salary,
          department_id: name.Department
        },
        function (err, result) {
          if (err) {
            console.log(err);
          }
          console.log('\n',
            '------------------------------------------',
            '\n',
            'new Department *' + name.Rolename + '* was Added',
            '\n',
            '------------------------------------------',
            '\n')
          promptUser().then(runQuery);
        }
      )
    })
  }

  //enter the employee’s first name, last name, role, and manager and that employee is added to the database
  else if (prompt.options === 'Add an Employee') {

    inquirer.prompt([
      {
        type: 'input',
        name: 'firstname',
        message: 'First name:'
      },
      {
        type: 'input',
        name: 'lastname',
        message: 'Last name:'
      },
      {
        type: 'list',
        name: 'Role',
        choices: [
          {
            name: 'Sales Lead',
            value: 1,
          },
          {
            name: 'Salesperson',
            value: 2,
          },
          {
            name: 'Lead Engineer',
            value: 3,
          },
          {
            name: 'Software Engineer',
            value: 4,
          },
          {
            name: 'Account Manager',
            value: 5,
          },
          {
            name: 'Accountant',
            value: 6,
          },
          {
            name: 'Legal Team Lead',
            value: 7,
          },
          {
            name: 'Lawyer',
            value: 8,
          }
        ]
      },
      {
        type: 'list',
        name: 'Manager',
        choices: [
          {
            name: "John Doe",
            value: 1,
          },
          {
            name: "Mike Chan",
            value: 2,
          },
          {
            name: "Ashley Rodrigues",
            value: 3,
          },
          {
            name: "Kevin Tupik",
            value: 4,
          },
          {
            name: "Kunal Singh",
            value: 5,
          },
          {
            name: "Malia Brown",
            value: 6,
          },
          {
            name: "Sarah Lourd",
            value: 7,
          },
          {
            name: "Tom Allen",
            value: 8,
          }

        ]
      }


    ]).then(function (name) {
      connection.query(
        'INSERT INTO Employee SET ?',
        {
          first_name: name.firstname,
          last_name: name.lastname,
          role_id: name.Role,
          manager_id: name.Manager
        },
        function (err, result) {
          if (err) {
            console.log(err);
          }
          console.log('\n',
            '-------------------------------------------------',
            '\n',
            'new Employee *' + name.firstname + ' ' + name.lastname + '* was Added',
            '\n',
            '-------------------------------------------------',
            '\n')
          promptUser().then(runQuery);
        }
      )
    })
  }


  //select an employee to update and their new role and this information is updated in the database 
  else if (prompt.options === 'Update an Employee Role') {

    inquirer.prompt([
      {
        type: 'list',
        name: 'Employee',
        choices: [
          {
            name: "John Doe",
            value: 1,
          },
          {
            name: "Mike Chan",
            value: 2,
          },
          {
            name: "Ashley Rodrigues",
            value: 3,
          },
          {
            name: "Kevin Tupik",
            value: 4,
          },
          {
            name: "Kunal Singh",
            value: 5,
          },
          {
            name: "Malia Brown",
            value: 6,
          },
          {
            name: "Sarah Lourd",
            value: 7,
          },
          {
            name: "Tom Allen",
            value: 8,
          }

        ]
      },
      {
        type: 'input',
        name: 'Role',
        message: 'Please enter new Role:'
      }


    ]).then(function (name) {
      connection.query(
        'UPDATE Role SET ? WHERE ?',
        [{
          title: name.Role
        },
        {
          id: name.Employee
        }],
        function (err, result) {
          if (err) {
            console.log(err);
          }
          console.log('\n',
            '------------------------------------------',
            '\n',
            'new Role *' + name.Role + '* was Added',
            '\n',
            '------------------------------------------',
            '\n')
          promptUser().then(runQuery);
        }
      )
    })
  }




  let newQuery = ''

  // department names and department ids
  const quaries = ['SELECT Department_name, id FROM Department',

    //job title, role id, the department that role belongs to, and the salary for that role
    'SELECT title, Role.id, Department_name, salary FROM Role LEFT JOIN Department ON Role.department_id=Department.id',

    //employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    'SELECT Employee.id, Employee.first_name, Employee.last_name, Role.title, Role.salary, concat(Manager.first_name," ",Manager.last_name) AS Manager, Department_name FROM Employee LEFT JOIN Role ON Employee.Role_id=Role.id LEFT JOIN Department ON Role.department_id=Department.id LEFT JOIN Employee Manager ON Manager.id=Employee.Manager_id',

  ];



  for (let i = 0; i < 3; i++) {
    if (choisesSet[i] === prompt.options) {
      newQuery = quaries[i];

      connection.query(newQuery, function (err, result) {
        if (err) {
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