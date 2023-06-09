const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const queries = require('./prompt-functions')
const logo = require('asciiart-logo');
const config = require('./package.json');
const longText = 'Lorem ipsum dolor sit amet, ' +
    'consectetur adipiscing elit, ' +
    'sed do eiusmod tempor incididunt ut labore et ' +
    'dolore magna aliqua. Ut enim ad minim veniam, ' +
    'quis nostrud exercitation ullamco laboris ' +
    'nisi ut aliquip ex ea commodo consequat. Duis aute ' +
    'irure dolor in reprehenderit in voluptate velit esse ' +
    'cillum dolore eu fugiat nulla pariatur. ' +
    'Excepteur sint occaecat cupidatat non proident, ' +
    'sunt in culpa qui officia deserunt mollit anim ' +
    'id est laborum.';


// creates connection to the DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'company_db',
  });
// checks if connection was successful!
  db.connect(err => {
    if(err){
      console.log(err)
    }else{
      jumbotronMessage();
      promptUser()
    }
  });
// welcome screen for prompt
jumbotronMessage = () => {
  console.log(
    logo({
        name: 'Company \n Tracker\n Assessment',
        font: 'ANSI Shadow',
        lineChars: 5,
        padding: 3,
        margin: 1,
        borderColor: 'grey',
        logoColor: 'white',
        textColor: 'white',
    })
    .render()
);
}
// prompt options
  const options = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee', 'Quit'
 ]
//  prompt main menu
// Below here are functions for queries based on user input!
const promptUser = () =>{
    inquirer.prompt([
      {
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: options
      }
    ])
      .then((answers)=>{
        const {choices} = answers;
        // prompt option conditional
        if(choices === 'View all departments'){
          // calling funtion on input
          viewDepartments();
        }
        if(choices === 'View all roles'){
          viewRoles();
        }
        if(choices === 'View all employees'){
          viewEmployees();
        }
        if(choices === 'Add a department'){
          addDepartment();
        }
        if(choices === 'Add a role'){
          addRole();
        }
        if(choices === 'Add an employee'){
          addEmployee();
        }
        if(choices === 'Update an employee'){
          updateEmployee();
        }
        // cancels the prompt interface when option picked
        if(choices === 'Quit'){
          db.end();
          console.log('You have successfully Quit!');
        }
      })
  };

const viewDepartments = () => {
    db.query('SELECT * FROM department', (err, results)=>{
      if(err){
        console.log(err)
      }
      console.table(results);
      promptUser();
    });
  };

const viewRoles = () => {
    db.query('SELECT * FROM role', (err, results)=>{
      if(err){
        console.log(err)
      }
      console.table(results);
      promptUser();
    });
  };

const viewEmployees = () => {
    db.query('SELECT * FROM employee', (err, results)=>{
      if(err){
        console.log(err)
      }
      console.table(results);
      promptUser();
    });
  };

const addDepartment = () => {
    inquirer.prompt([{
      type: 'input',
      name: 'department',
      message: 'What is the departments name?',
      validate: department =>{
        if(department){
          return true;
        }else{
          console.log('You must enter a department name!')
          return false;
        }
      }
  }])
    .then(answers => {
      db.query('INSERT INTO department (name) VALUES (?)', answers.department,(err)=>{
        if(err){
          console.log(err)
        }else{
          console.log(`Added ${answers.department} to depratments!`);
          viewDepartments();
        }
      })
    })
  };

const addRole = () => {
  // Fetch the department data from the database
  db.query("SELECT * FROM role", (err, results) => {
    if (err) {
      console.log(err);
      return;
    }

    const departmentChoices = results.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of the role?",
          validate: (title) => {
            if (title) {
              return true;
            } else {
              console.log("You must enter a role title!");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for this role?",
          validate: (salary) => {
            if (salary) {
              return true;
            } else {
              console.log("You must enter a salary!");
              return false;
            }
          },
        },
        {
          type: "list",
          name: "departmentId",
          message: "Select a department for this role:",
          choices: departmentChoices,
        },
      ])
      .then((answers) => {
        db.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [answers.title, answers.salary, answers.departmentId],
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                `Successfully added role!`
              );
              promptUser();
              viewRoles();

            }
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const addEmployee = () => {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) {
      console.log(err);
      return;
    }

    const roleChoicesTwo = results.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });

    db.query('SELECT id, first_name, last_name FROM employee', (err, employees) => {
      if (err) {
        console.log(err);
        return;
      }

      const employeeChoices = employees.map((employee) => {
        return {
          name: employee.first_name + employee.last_name,
          value: employee.id,
        };
      });

      inquirer.prompt([
        {
          type: "input",
          name: "firstname",
          message: "What is the employee's first name?",
          validate: (firstname) => {
            if (firstname) {
              return true;
            } else {
              console.log("You must enter a first name!");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "lastname",
          message: "What is the employee's last name?",
          validate: (lastname) => {
            if (lastname) {
              return true;
            } else {
              console.log("You must enter a last name!");
              return false;
            }
          },
        },
        {
          type: "list",
          name: "roleid",
          message: "Select a department for this role:",
          choices: roleChoicesTwo,
        },
        {
          type: 'list',
          name: 'manager',
          message: "Who is this employee's manager?",
          choices: employeeChoices,
          validate: (manager) => {
            if (manager) {
              return true;
            } else {
              console.log('You must select a manager!')
              return false;
            }
          }
        },
      ])
        .then((answers) => {
          db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)', [answers.firstname, answers.lastname, answers.roleid, answers.manager.value], (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Successfully added to the database!")
              promptUser();
            }
          });
        })
        .catch((err) => {
          console.log(err);

        });
    });
  });
};

const updateEmployee = () => {
  db.query('SELECT id, first_name, last_name FROM employee', (err, employees) => {
    if (err) {
      console.log(err);
      return;
    }
    const employeeChoices = employees.map((employee) => {
      return {
        name: employee.first_name + employee.last_name,
        value: employee.id,
      }
    })
    db.query('SELECT title FROM role', (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      const roleChoices = results.map((role) => {
        if (err) {
          console.log(err);
          return;
        }
        return {
          name: role.title,
          value: role.id,
        };
      });

      inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Which employee would you like to update?',
          choices: employeeChoices
        },
        {
          type: 'list',
          name: 'role',
          message: 'Which role would you like to assign to the employee?',
          choices: roleChoices
        }
      ])
      .then((answers)=>{
        const employeeID = answers.employee;
        const roleId = answers.role;
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [employeeID, roleId], (err)=>{
          if(err){
            console.log(err);
          } else{
            console.log(`successfully changed!`)
            promptUser();
          }
        })

      })
      .catch((err)=>{
        console.log(err);
      })
    });

  });

};
