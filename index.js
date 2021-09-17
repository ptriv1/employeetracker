const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateEmployeeRole();
                break;
        }
       })

function viewDepartments() {
    console.log("View department");
    db.connect(function(err) {
        if (err) throw err;
        db.query("SELECT name from department", function (err, result, fields) {
            if (err) throw err;
            console.table(result);
        });
    });
}

function viewRoles() {
    console.log("View roles");
}

function viewEmployees() {

}

function addDepartment() {

}

function addRole() {

}

function addEmployee() {

}

function updateEmployeeRole() {
    console.log("role");
}