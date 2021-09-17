const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db',
},
console.log('Connected!')
);

inquirer
    .prompt([
        {
            type: 'list', 
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"], 
            name: 'select',
        }
    ])
    .then((response) => {
        console.log(response);
        switch (response.select) {
            case "View all departments":
                console.log("See table")
                break;
            case "View all roles":
                console.log("View roles")
                break;
        }
       })
   