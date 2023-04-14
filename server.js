// import express and mysql2 and console.table
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'company_db',

  });

  const displayTable = () => {
    connection.query('SELECT * FROM department;', (error, results) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.table(results); // Display the results in a table format
      }
    });
  };


module.exports = {connection,
    express,
    app,
    mysql,
    PORT,
    displayTable

};
