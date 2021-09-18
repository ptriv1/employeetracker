/* 
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
*/

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

db.connect(function (err) {
    if (err) throw err;
  });

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

/*
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
*/
function viewDepartments() {
    db.query("SELECT id, name FROM department", function (err, result, fields) {
        if (err) throw err;
        console.table(result);
    });
}

/*
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
*/
function viewRoles() {
    db.query("SELECT id, title, salary, department_id FROM role", function (err, result, fields) {
        if (err) throw err;
        console.table(result);
    })
}

/*
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
*/

function viewEmployees() {

}


/*
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
*/
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Please enter the name of the department',
                name:'department'
            }
        ])
        .then((response) => {
            console.log(response.department);
            db.query("INSERT INTO department SET ?", {name: response.department}, function (err, result, fields) {
                if (err) throw err;
                console.table(result);
            })
        })
}


/*
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
*/
function addRole() {

}


/*
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
*/
function addEmployee() {

}

/*
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
*/
function updateEmployeeRole() {
    console.log("role");
}