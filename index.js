const { prompt } = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

init();

function init() {
    prompt([
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View all Departments','View all Roles','View all Employees','Add a department','Add a Role','Add an Employee','Update an Employee role']
    }
    ]).then( async ({choice}) => {
        if(choice=='View all Departments') {
            db.promise().query('SELECT * FROM department').then(data =>{
                console.table(data[0])
                init();
            })
        };

        if(choice=='View all Roles') {
            db.promise().query('SELECT * FROM role').then(data => {
                console.table(data[0])
                init();
            })
        };

        if(choice=='View all Employees') {
            db.promise().query('SELECT * FROM employee').then(data => {
                console.table(data[0])
                init();
            })
        };

        if(choice=='Add a department') {
            prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is the department name?'
                }
            ]).then(newDepart => {
                db.promise().query('INSERT INTO department SET ?',newDepart);
                init();
            }) 
        };

        if(choice=='Add a Role') {

            let departments = await db.promise().query('SELECT name, id AS value FROM department');

            prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the title?'
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'What is the salary?'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'What is the department?',
                    choices: departments[0]
                }
            ]).then(newRole => {
                db.promise().query('INSERT INTO role SET ?',newRole);
                init();
            }) 
        };

        if(choice=='Add an Employee') {
            let roles = await db.promise().query('SELECT title AS name, id AS value FROM role');
            let managers = await db.promise().query('SELECT CONCAT(first_name," ",last_name) AS name, id AS value FROM employee');

            prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the employee\'s first name?'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the employee\'s last name?'
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'What is the role?',
                    choices: roles[0]
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Who is their manager?',
                    choices: managers[0]
                }
            ])
            .then(newEmployee=> {
                db.promise().query('INSERT INTO employee SET ?', newEmployee).then(init);
            });
        };
            if(choice=='Update an Employee role') {
                let roles = await db.promise().query('SELECT title AS name, id AS value FROM role');
                let Employee = await db.promise().query('SELECT CONCAT(first_name," ",last_name) AS name, id AS value FROM employee');
                prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        message: 'Which employee\'s role would you like to update?',
                        choices: Employee[0]
                    },
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'Which role do you want to update the employee to?',
                        choices: roles[0]
                    }
                ])
                .then(updatedRole=> {
                    db.promise().query('INSERT INTO employee SET ?', updatedRole).then(init);
                });
            };

    });
};