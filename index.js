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
        selection();
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
        selection();
    })
}

/*
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
*/

function viewEmployees() {
    console.log("view function running");
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id", function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        selection();
    })
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
                selection();
            })
        })
}

/*
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
*/


function addRole() {
    db.query("SELECT * FROM department", function (err, result, fields) {
        const choices = result.map(deptRow => ({name: deptRow.name, value: deptRow.id}));
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'Please enter the title of the role',
                name: 'role'
            },
            {
                type: 'input',
                message: 'Please enter the salary of the role',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'Please enter the department of the role',
                name: 'department',
                choices: choices           
            }
        ])
        .then((response) => {
            db.query("INSERT INTO role SET ?", {title: response.role, salary: response.salary, department_id: response.department}, function (err, result, fields) {
                if (err) throw err;
                selection();
            })
        }) 
    })
}

/*
WHEN I choose to add an employee
THEN I am prompted to enter the employee???s first name, last name, role, and manager, and that employee is added to the database
*/
function addEmployee() {
    db.query("SELECT * FROM role", function (err, result, fields) {
        const roleChoices = result.map(roleRow => ({name: roleRow.title, value: roleRow.id}));
        db.query("SELECT * FROM employee", function (error, employeeResult, fields) {
            const employeeChoices = employeeResult.map(employeeRow => ({name: employeeRow.first_name + " " + employeeRow.last_name, value: employeeRow.id}));
            employeeChoices.push({name: "none", value: null});
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'Please enter the first name of the employee',
                name:'firstName'
            },
            {
                type: 'input',
                message: 'Please enter the last name of the employee',
                name: 'lastName'
            },
            {
                type: 'list',
                message: 'Please enter the role of the employee',
                name: 'employeeRole',
                choices: roleChoices
            },
            {
                type: 'list',
                message: 'Please enter the ID of the manager',
                name: 'employeeManager',
                choices: employeeChoices
            }
        ])

        .then((response) => {
            db.query("INSERT INTO employee SET ?", {first_name: response.firstName, last_name: response.lastName, role_id: response.employeeRole, manager_id: response.employeeManager}, function (err, result, fields) {
                if (err) throw err;
                selection();
            })
        }) 
        }) 
    }) 
}

/*
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
*/
function updateEmployeeRole() {
    db.query("SELECT * FROM employee", function (err, result, fields) {
            const employeeChoices = result.map(employeeRow => ({name: employeeRow.first_name + " " + employeeRow.last_name}));
            db.query("SELECT * FROM role", function (error, roleResult, fields) {
                const roleChoices = roleResult.map(roleRow => ({name: roleRow.title, value: roleRow.id}));
                inquirer
                .prompt([
                    {
                    type: 'list',
                    message: 'Please choose an employee to update',
                    name: 'updatedEmployee',
                    choices: employeeChoices
                    },
                    {
                    type: 'list',
                    message: 'Please choose a role',
                    name: 'updatedRole',
                    choices: roleChoices
                    }
                    ])

                .then((response) => {
                db.query("INSERT INTO employee SET ?", {role_id: response.employeeRole, }, 
                function (err, result, fields) {
                if (err) throw err;
                selection();
                })
                }) 
        })
    }) 
}

function selection() {
    inquirer
    .prompt([
        {
            type: 'list', 
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"], 
            name: 'select',
        }
    ])
    .then((response) => {
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
}