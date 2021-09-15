const inquirer = require('inquirer');

/*
view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
*/

inquirer
    .prompt([
        {
            type: 'list', 
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"], 
            name: 'select',
        }
    ])
    .then((answers) =>
        console.log('Success!')
    );