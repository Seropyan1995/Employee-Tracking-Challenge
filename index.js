const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'company_db',

  });


afterConnection
  afterConnection = () => {
    console.log("***********************************")
    console.log("*    ___                          *")
    console.log("*   |___                          *")
    console.log("*   |___                          *")
    console.log("***********************************")

  };

//  https://github.com/nicolewallace09/employee-tracker/blob/master/db/seeds.sql
