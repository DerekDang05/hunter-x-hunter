//preliminaries to create code
const express = require('express')
const inquirer = require('inquirer')
const mysql = require('mysql2')

//connects to mysql employeeTracker database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'employeeTracker_db'
    },
    console.log(`Connected to the employeeTracker_db database.`)
  );
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// function that allows other functions to access entire database depending on input
const viewAll = (table) => {
    db.query(`SELECT * FROM ${table}`, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptMenu(); 
    });
};


const addEmployeeRole = () => {
    db.query(`SELECT * FROM employee;`, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter employee id you want to change',
            name: 'employeeID',
        },
        {
            type: 'input',
            message: 'Enter new role id',
            name: 'newEmployeeRole'
        }
    ]).then((data) => {
        db.query(`UPDATE employees SET role_id = (?) WHERE id = (?);`,
            [data.newEmployeeRole, data.employeeID],
            (err) => {
                if (err) throw err;
                console.log('Employee information updated.');
                promptMenu();
            });
    });
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter first name of new employee',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Enter last name of new employee',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'Enter the role id of new employee',
            name: 'role_id'
        },
        {
            type: 'input',
            message: 'Enter manager id of new employee',
            name: 'manager_id'
        }
    ]).then((data) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,
            [data.firstName, data.lastName, data.role_id, data.manager_id],
            (err) => {
                if (err) throw err;
                console.log('Employee added successfully');
                promptMenu();
            });
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter new role',
            name: 'role'
        },
        {
            type: 'input',
            message: 'Enter salary of new role',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Enter department id of new role',
            name: 'department_id'
        }
    ]).then((data) => {
        db.query(`INSERT INTO role(title, salary, department_id) VALUES (?,?,?);`,
            [data.role, data.salary, data.deptartment_id],
            (err) => {
                if (err) throw err;
                console.log('Role added successfully');
                console.table(data);
                promptMenu();
            });
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter name of new department',
            name: 'department_name'
        }
    ]).then((data) => {
        db.query(`INSERT INTO department(name) VALUES (?);`,
            [data.department_name],
            (err) => {
                if (err) throw err;
                console.log('Department added successfully');
                console.table(data);
                promptMenu();
            });
    });
};

const quit = () => {
    db.end();
    process.exit();
};



const promptMenu = () => {
    inquirer
     .prompt({
        type: "list",
        name: "option",
        message: "What would you like to do?",
        choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Add Employee Role",
        "Quit",
    ]
})
    .then((data) => {
        if (data.option === 'View All Departments') {
            viewAll("department");
        };
        if (data.option === 'View All Roles') {
            viewAll("role");
        };
        if (data.option === 'View All Employees') {
            viewAll("employee");
        };
        if (data.option === 'Add Department') {
            addDepartment();
        };
        if (data.option === 'Add Role') {
            addRole();
        };
        if (data.option === 'Add Employee') {
            addEmployee();
        };
        if (data.option === 'Add Employee Role') {
            addEmployeeRole();
        }
        if (data.option === 'Quit') {
            quit();
        };
    });
};

db.connect((err) => {
    if (err) throw err;
    app.listen(PORT, () => {
        console.log(`You are now on port ${PORT}`);
    });
    promptMenu();
});