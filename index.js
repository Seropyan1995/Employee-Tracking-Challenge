const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const queries = require('./prompt-functions')

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
// complete this cosmetic welcome message in the end!
jumbotronMessage = () => {
      console.log(" ___________________________________________")
      console.log("|                                           |");
      console.log("|                                           |");
      console.log("|                                           |");
      console.log("|                                           |");
      console.log("|      TO DO: WELCOME BOARD                 |");
      console.log("|                                           |");
      console.log("|___________________________________________|");
  };
  const options = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee', 'Quit'
 ]
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

        if(choices === 'View all departments'){
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
          addEmployee()
        }
        if(choices === 'Quit'){
          db.end();
          console.log('You have successfully Quit!');
        }
      })
  };
  const viewDepartments = () =>{
    db.query('SELECT * FROM department', (err, results)=>{
      console.table(results);
      promptUser();
    });
  };

const viewRoles = () => {
    db.query('SELECT * FROM role', (err, results)=>{
      console.table(results);
      promptUser();
    });
  };

const viewEmployees = ()=> {
    db.query('SELECT * FROM employee', (err, results)=>{
      console.table(results);
      promptUser();
    });
  };

const addDepartment = () =>{
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
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.log(err);
      return;
    }

    const departmentChoices = results.map((department) => {
      return {
        name: department.name,
        value: department.id,
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
                `Successfully added role: ${answers.title} with salary: ${answers.salary} in department ID: ${answers.departmentId}`
              );
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

}
