const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'company_db',
  });

  db.connect(err => {
    if(err){
      console.log(err)
    }else{
      jumbotronMessage();
    }
  });

    // C:\Users\shiny\Employee Tracking Challenge\db\schema.sql
   jumbotronMessage= () => {
      console.log("***********************************");
      console.log("*                                 *");
      console.log("*      TO DO: WELCOME BOARD       *");
      console.log("*                                 *");
      console.log("***********************************");
  };
